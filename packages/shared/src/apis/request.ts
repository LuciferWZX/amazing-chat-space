import { StorageManager } from "@/instants";
import type { ExtendOptionsInit, ResponseError } from "umi-request";
import { extend } from "umi-request";
const errorHandler = (error:ResponseError)=>{
    console.error("请求出错:",{error})
    
    
    throw error
    
}
export function createClient(baseURL:string,options?:ExtendOptionsInit){
    return extend({
        prefix:baseURL,
        timeout:10000,
        cache:"no-cache",
        errorHandler:errorHandler,
        ...options
    })
}
const request = createClient("/api",{
    headers:{
        "Content-Type":"application/json;charset=utf-8",
    }
})
request.interceptors.request.use((url,options)=>{
    const token = StorageManager.getToken()
    if(token){
        options.headers = {
            ...options.headers,
            "Authorization":`Bearer ${token}`
        }
    }
    return {
        url,
        options
    }
})
request.interceptors.response.use((response)=>{
    return response
})
export default request