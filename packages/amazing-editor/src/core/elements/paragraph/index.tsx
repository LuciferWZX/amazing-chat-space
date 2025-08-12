import type { ParagraphElement } from "@/types";
import { cn } from "@amazing-chat/ui";
import type { RenderElementProps } from "slate-react";
interface ParagraphElementProps extends RenderElementProps{
    element:ParagraphElement
}
export const ParagraphRenderElement=(props:ParagraphElementProps)=>{
    const {attributes,children}=props
    return(
        <p className={cn("")}  {...attributes}>
            {children}
        </p>
    )
}