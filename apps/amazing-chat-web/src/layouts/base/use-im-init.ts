import { stores, types,instants } from "@amazing-chat/shared";
import { getRouteApi } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import WKSDK, { ConnectStatus } from "wukongimjssdk";
import {useIMStore} from "@/stores";
import { match } from "ts-pattern";

const {StorageManager}=instants
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
		const user = useAppStore.getState().user!;
		console.warn(`用户:${user.id},进入IM区域，开始监听并开始连接`);

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
		console.warn("连接状态",status,reasonCode)
		useIMStore.setState({connectStatus:status})
		match(status)
		.with(ConnectStatus.Connected,()=>{
			console.info("连接成功");
		})
		.with(ConnectStatus.Disconnect,()=>{
			console.error("连接失败", reasonCode); //  reasonCode: 2表示认证失败（uid或token错误）
		})
		.with(ConnectStatus.ConnectFail,()=>{
			console.error("连接失败", reasonCode); //  reasonCode: 2表示认证失败（uid或token错误）
		})
		.with(ConnectStatus.ConnectKick,()=>{
			console.error("被踢下线", reasonCode);
			//如果当时正要退出登录，则关闭退出登录弹窗
			if(useAppStore.getState().logoutOpen){
				useAppStore.setState({logoutOpen:false})
			}
			StorageManager.removeToken()
			useAppStore.setState({kickedOpen:true})
		})
		.with(ConnectStatus.Connecting,()=>{
			console.info("连接中");
		})
	}
};
export default useIMInit;
