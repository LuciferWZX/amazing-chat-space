import { Avatar, AvatarFallback, AvatarImage } from "@amazing-chat/ui"
import {  type ReactNode } from "react"

interface MessageBubbleProps {
    src?:string
    fallback?:ReactNode
}
export const MessageAvatar = (props:MessageBubbleProps) =>{
    const {src,fallback}=props
    return(
       <div className="mt-4">
         <Avatar className={"size-8"}>
                <AvatarImage src={src} />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
       </div>
    )
}