import { useEffect, useState } from "react"
import { timeUpdater } from "./time-updater"
import dayjs from "dayjs"
import { getTimeStringAutoShort } from "@/utils/format"
interface InstanceContainerProps {
    timestamp:number
}
export const InstanceContainer = (props:InstanceContainerProps) =>{
    const {timestamp}=props
    const [_,setNow]=useState(dayjs())
    useEffect(()=>{
        const unsubscribe=timeUpdater.subscribe(()=>{
           setNow(dayjs())
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    return getTimeStringAutoShort(timestamp, true)
}