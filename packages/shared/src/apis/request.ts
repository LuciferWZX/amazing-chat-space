import { toast } from "sonner";
import type { ExtendOptionsInit, ResponseError } from "umi-request";
import { extend } from "umi-request";
import { StorageManager } from "@/instants";
import { ResponseCode } from "@/types";

const errorHandler = (error: ResponseError) => {
	console.error("请求出错:", { error });
	const { response } = error;
	if (!response.ok) {
		const statusTextMap: Record<number, string> = {
			500: "服务器错误",
			401: "未授权",
			403: "拒绝访问",
			404: "未找到资源",
			405: "方法不允许",
			408: "请求超时",
		};
		const statusText = statusTextMap[response.status];
		toast.error(statusText, { id: "error_id" });
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
	const data = await response.clone().json();
	console.warn(111, data);
	if (data && data.code !== ResponseCode.SUCCESS) {
		toast.error(data.message, { id: "data_failed" });
	}
	return response;
});
export default request;
