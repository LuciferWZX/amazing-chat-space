import { cn } from "@amazing-chat/ui"
import {  type ReactNode } from "react"

interface MessageBubbleProps {
    children?:ReactNode
    className?:string
}
export const MessageBubble = (props:MessageBubbleProps) =>{
    const {children,className}=props
    return(
        <div className={cn("py-2.5 px-3",className)}>
            {children}
        </div>
    )
}