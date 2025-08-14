import { AmazingEditorManager } from "@/instance/amazing-editor"
import type { Descendant, Editor } from "slate"
import { create } from "zustand"

export interface EditorInstance{
    id:string,
    editor:Editor,
    value:Descendant[],
}
interface EditorStoreState{
    instances:Map<string,EditorInstance>
} 
interface Actions {
    initInstance:(editor:Editor,id:string,value?:Descendant[])=>void
    setValue:(id:string,value:Descendant[])=>void
}
const initialState:EditorStoreState={
    instances:new Map(),
}
export const useEditorStore=create<EditorStoreState&Actions>((set,get)=>({
    ...initialState,
    initInstance:(editor:Editor,id:string,value?:Descendant[])=>{
        const instanceValue=value || AmazingEditorManager.emptyValue
        if(get().instances.has(id)){
            console.info("[实例已存在]",id);
            return
        }
        const instance:EditorInstance = {
            id,
            editor,
            value:instanceValue
        }
        console.info("[实例初始化]",id);
        set(state=>({
            instances:state.instances.set(id,instance)
        }))
    },
    setValue:(id:string,value:Descendant[])=>{
        set(state=>({
            instances:state.instances.set(id,{
                id,
                editor:state.instances.get(id)?.editor,
                value:value
            })
        }))
    }
}))
