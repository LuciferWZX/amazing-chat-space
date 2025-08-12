import { cn } from "@amazing-chat/ui";
import type { RenderLeafProps } from "slate-react";
interface LeafRenderElementProps extends RenderLeafProps{
  
}
export const LeafRenderElement=(props:LeafRenderElementProps)=>{
    const {attributes,children,leaf}=props
    return(
        <span 
            {...attributes}
            className={cn({
                "font-bold":leaf.bold,
                "italic":leaf.italic,
                "underline":leaf.underline,
                "line-through":leaf.strikethrough,
            })}
            style={{
                color:leaf.color,
                backgroundColor:leaf.backgroundColor
            }}  
            >
            {children}
        </span>
    )
}