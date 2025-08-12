import { LeafRenderElement, MentionRenderElement, ParagraphRenderElement } from "@/core/elements"
import type { CustomElement } from "@/types"
import { useCallback } from "react"
import type { RenderElementProps, RenderLeafProps } from "slate-react"
import { match } from "ts-pattern"
interface IRenderElementProps extends RenderElementProps{
    element:CustomElement
}
const useRender=()=>{
    //渲染各个节点
    const renderElement=useCallback((props:IRenderElementProps)=>{
        const {element,...rest}=props
        return match(element)
        .with({type:"mention"},(_element)=><MentionRenderElement element={_element} {...rest}/>)
        .otherwise((_element)=>{
            return <ParagraphRenderElement element={_element} {...rest}/>
        })
    },[])
    //渲染叶子节点
    const renderLeaf=useCallback((props:RenderLeafProps)=>{
        return <LeafRenderElement {...props}/>
    },[])
    return {
        renderElement,
        renderLeaf
    }
}
export default useRender