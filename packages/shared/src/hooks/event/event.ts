import { useEffect } from "react";
import EventEmitter, { type EventHandler } from "./event-emitter";

export const events = new EventEmitter()

export function useEventBus<T=any>(event:string,cb:EventHandler<T>){
    useEffect(()=>{
        events.on(event,cb)
        return ()=>{
            events.off(event,cb)
        }
    })
}