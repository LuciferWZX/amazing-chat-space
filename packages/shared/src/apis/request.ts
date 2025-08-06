import { toast } from "sonner";
import type { ExtendOptionsInit, ResponseError } from "umi-request";
import { extend } from "umi-request";
import { StorageManager } from "@/instants";
import {type CustomResponse, ResponseCode} from "@/types";

const errorHandler = (error: ResponseError<CustomResponse<unknown>>) => {
	console.error("请求出错:", { error });
	const { response,message,type,data } = error;
	if (response) {
		//请求已发送，但服务器端返回状态非 2xx 的响应
		const statusTextMap: Record<number, string> = {
			500: "服务器错误",
			401: "未授权",
			403: "拒绝访问",
			404: "未找到资源",
			405: "方法不允许",
			408: "请求超时",
		};
		let statusText = statusTextMap[response.status];
		if (data){
			statusText = data.message
		}
		toast.error(statusText, { id: "error_id" });
	}else{
		//响应没有返回
		let _message = message
		if (type === "SyntaxError"){
			_message = message;
		}
		toast.error(_message, { id: "error_id" });
	}
	throw error;
};
export function createClient(baseURL: string, options?: ExtendOptionsInit) {
	return extend({
		prefix: baseURL,
		timeout: 10000,
		cache: "no-cache",
		errorHandler: errorHandler,
		...options,
	});
}
const request = createClient("/api", {
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
});
request.interceptors.request.use((url, options) => {
	const token = StorageManager.getToken();
	if (token) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
		};
	}
	return {
		url,
		options,
	};
});
request.interceptors.response.use(async (response) => {
	if (!response.ok){
		return response;
	}
	const data = await response.clone().json();
	if (data && data.code !== ResponseCode.SUCCESS) {
		toast.error(data.message, { id: "data_failed" });
	}
	return response;
});
export default request;
