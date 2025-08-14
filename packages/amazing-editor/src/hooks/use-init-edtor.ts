import { AmazingEditorManager } from "@/instance/amazing-editor"
import { useEditorStore } from "@/stores/use-editor-store"
import { useEffect } from "react"
import type { Descendant, Editor } from "slate"

export const useInitEditor=(editor:Editor,instanceId:string,initialValue?:Descendant[])=>{
    useEffect(()=>{
        if (editor) {
            // 初始化编辑器实例
            const {initInstance}=useEditorStore.getState()
            initInstance(editor,instanceId,initialValue ?? AmazingEditorManager.emptyValue)
        }
        
    },[instanceId,editor])
}
