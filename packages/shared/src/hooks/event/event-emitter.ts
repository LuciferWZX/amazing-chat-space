import { pull } from 'lodash-es'
export type EventHandler<E = any> = (event:E) => void

class EventEmitter<E = any> {
    private _events:Record<string,EventHandler<E>[]>
    constructor(){
        this._events = {}
    }
    private _getFns(event:string){
        return this._events[event] || (this._events[event] = [])
    }

    public on(event:string,cb:EventHandler<E>){
        const fns = this._getFns(event)
        fns.push(cb)
    }
    public off(event:string,cb?:EventHandler<E>){
        if(cb){
           const fns = this._getFns(event)
           pull(fns,cb)
        }else{
            delete this._events[event]
        }
    }
    public once<T=E>(event:string,cb:EventHandler<T>){
        const fn:EventHandler<E>=(e)=>{
            this.off(event,fn)
            cb(e as any)
        }
        this.on(event,fn)
    }
    public emit<T=E>(event:string,param:T){
        const fns = this._getFns(event)
        fns.forEach(fn=>fn(param as any))
    }
}
export default EventEmitter