import {ConnectStatus} from "wukongimjssdk";
import {create} from "zustand/react";

interface IMStoreState {
    connectStatus:ConnectStatus
    globalSearchVisible:boolean
}
const initialState:IMStoreState={
    connectStatus:ConnectStatus.Connecting,
    globalSearchVisible:false
}
export const useIMStore = create<IMStoreState>(()=>{
    return {
        ...initialState
    }
})