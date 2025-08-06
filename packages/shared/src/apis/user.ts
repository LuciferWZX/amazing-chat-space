import type { BaseUser } from "@/types";
import type { CustomResponse } from "@/types/response.ts";
import request from "./request";
const USER_PREFIX="/user"
export const login = (data: { username: string; password: string }) => {
	return request<CustomResponse<{access_token:string}>>("/auth/login", {
		method:"POST",
		data:data,
	});
};
/**
 * @description 根据token获取用户的文档
 */
export const getProfile = () => {
	return request.get<CustomResponse<BaseUser>>(`${USER_PREFIX}/profile`);
};
export const register = (data: any) => {
	return request.post("/register", data);
};
