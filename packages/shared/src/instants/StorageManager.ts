import store from "storejs"

export class StorageManager {
    /**
     * @description 获取token
     * @returns 
     */
   static getToken(){
    const token:string | null = store.get("token") ?? null
    return token
   }

    /**
     * Sets the authentication token in the store.
     * @param {string|null} token - The token to be set. If null, it will clear the token from the store.
     * @return {void} This method does not return a value.
     */
   static setToken(token:string|null){
       return store.set('token',token)
   }
   /**
    * @description 清除所有数据
    */
    static clear(){
        store.clear()
    }

}