import request from "./request"
export const login = (data:{
    username:string,
    password:string
})=>{
    return request.post("/login",data)
}

export const register = (data:any)=>{
    return request.post("/register",data)
}