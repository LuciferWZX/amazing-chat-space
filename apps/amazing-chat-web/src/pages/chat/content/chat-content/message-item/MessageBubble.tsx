import { cn } from "@amazing-chat/ui"
import {  type ReactNode } from "react"

interface MessageBubbleProps {
    children?:ReactNode
    className?:string
}
export const MessageBubble = (props:MessageBubbleProps) =>{
    const {children,className}=props
    return(
        <div className={cn("rounded-lg p-2",className)}>
            {children}
        </div>
    )
}