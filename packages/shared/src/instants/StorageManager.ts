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
    * @description 清除所有数据
    */
    static clear(){
        store.clear()
    }

}