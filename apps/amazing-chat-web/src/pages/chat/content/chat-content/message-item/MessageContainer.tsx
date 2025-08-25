    import { cn } from "@amazing-chat/ui"
import {  type ReactNode } from "react"

interface MessageContainerProps {
    children?:ReactNode
    className?:string
}
export const MessageContainer = (props:MessageContainerProps) =>{
    const {children,className}=props
    return(
        <div className={cn("",className)}>
            {children}
        </div>
    )
}