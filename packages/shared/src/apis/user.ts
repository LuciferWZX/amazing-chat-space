import request from "./request"
import type {CustomResponse} from "@/types/response.ts";
import type {BaseUser} from "@/types";
export const login = (data:{
    username:string,
    password:string
})=>{
    return request.post("/login",data)
}
/**
 * @description 根据token获取用户的文档
 */
export const getProfile=()=>{
    return request.get<CustomResponse<BaseUser>>('/profile')
}
export const register = (data:any)=>{
    return request.post("/register",data)
}