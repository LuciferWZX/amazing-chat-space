
import router from '@/hooks/router'
import {stores,apis,instants} from '@amazing-chat/shared'
const {StorageManager}=instants
const {useAppStore}=stores
export class AppInstance {
    static logout = async () =>{
        this.redirectLogin()
         await apis.logout()
         StorageManager.removeToken()

         this.clearUserInfo()
    }

    static redirectLogin = () =>{
        router.navigate({to:"/auth/login",replace:true})
    }
    static kicked = async () =>{
         this.redirectLogin()
        requestAnimationFrame(()=>{
            this.clearUserInfo()
        })
    }
    static clearUserInfo = () =>{
        const {reset}=useAppStore.getState()
        reset()
    }
}