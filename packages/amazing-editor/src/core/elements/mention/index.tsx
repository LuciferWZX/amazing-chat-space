import { IS_MAC } from "@/lib/environment";
import type { MentionElement } from "@/types";
import { cn } from "@amazing-chat/ui";
import { Fragment } from "react/jsx-runtime";
import { useFocused, useSelected, type RenderElementProps } from "slate-react";
interface MentionElementProps extends RenderElementProps{
    element:MentionElement
}
export const MentionRenderElement=(props:MentionElementProps)=>{
    const {attributes,children,element}=props
    const selected = useSelected()
  const focused = useFocused()
    return(
        <span 
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.character.replace(' ', '-')}`}
            className={cn("inline-block mx-[1px] text-primary",{
                "border-primary ring-[var(--primary)]/50 ring-[3px]":selected && focused,
               
            })}  
            >
                      {/* Prevent Chromium from interrupting IME when moving the cursor */}
      {/* 1. span + inline-block 2. div + contenteditable=false */}
                <span className={'block'} contentEditable={false}>
                    {IS_MAC ? (
                        <Fragment>
                            {children}@{element.character}
                        </Fragment>
                    ) : (
    // Others like Android https://github.com/ianstormtaylor/slate/pull/5360
                        <Fragment>
                            @{element.character}
                            {children}
                        </Fragment>
                    )}
                </span>
        </span>
    )
}