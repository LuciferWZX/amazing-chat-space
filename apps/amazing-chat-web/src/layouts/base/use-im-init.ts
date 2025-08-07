import { stores, types } from "@amazing-chat/shared";
import { getRouteApi } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import WKSDK, { ConnectStatus } from "wukongimjssdk";

const { ResponseCode } = types;
const { useAppStore } = stores;
type IMAddress = types.IMAddress;
const useIMInit = () => {
	const routeApi = getRouteApi("/base");
	const response = routeApi.useLoaderData();
	useLayoutEffect(() => {
		if (response?.code === ResponseCode.SUCCESS && response?.data) {
			const { data } = response;
			init(data);
			return () => {
				console.warn("离开IM区域，卸载所有监听并断开连接");
				WKSDK.shared().connectManager.removeConnectStatusListener(
					connectStatusListener,
				);
				WKSDK.shared().connectManager.disconnect();
			};
		}
	}, []);
	const init = async (config: IMAddress) => {
		console.warn("进入IM区域，开始监听并开始连接");
		const user = useAppStore.getState().user!;
		WKSDK.shared().config.addr = config.ws_addr;
		WKSDK.shared().config.uid = user.id;
		WKSDK.shared().config.token = user.access_token;
		WKSDK.shared().config.debug = true;
		//开始连接
		WKSDK.shared().connectManager.connect();
		//监听连接状态
		WKSDK.shared().connectManager.addConnectStatusListener(
			connectStatusListener,
		);
	};
	function connectStatusListener(status: ConnectStatus, reasonCode?: number) {
		if (status === ConnectStatus.Connected) {
			console.info("连接成功");
		} else {
			console.error("连接失败", reasonCode); //  reasonCode: 2表示认证失败（uid或token错误）
		}
	}
};
export default useIMInit;
