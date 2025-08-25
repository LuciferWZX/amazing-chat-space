import {  type Message } from "wukongimjssdk"
import { cn } from "@amazing-chat/ui"
import type { AppUser } from "@/types"
import { MessageAvatar } from "./MessageAvatar"
import { MessageBubble } from "./MessageBubble"
import { MessageContainer } from "./MessageContainer"
import { useMemo } from "react"
import { isTextContent } from "@/utils/is"
import { RenderWithMention } from "./RenderWithMention"
import { getTimeStringAutoShort } from "@/utils/format"
import { MessageSectionRight } from "./MessageSectionRight"
interface MessageItemProps {
    message:Message
    className?:string
    user:AppUser|undefined
}
const MessageItem = (props:MessageItemProps) => {
    const {message,className,user} = props
    const isFromMe=useMemo(()=>{
        return message.fromUID===user?.id
    },[message.fromUID,user?.id])
    const content=useMemo(()=>{
        const msgContent=message.content
        if(isTextContent(msgContent)){
           
            return msgContent.text
        }
        return msgContent.conversationDigest
    },[message.content])
    const time = useMemo(()=>{
        return (
            <div className="group-hover/message:opacity-100 opacity-0 text-xs text-muted-foreground">
                {getTimeStringAutoShort(message.timestamp*1000, true)}
            </div>
        )
    },[message.timestamp])
    return(
        <div className={cn("group/message",className)}>
            <div className={cn("flex gap-2")}>
                <MessageAvatar />
                <MessageContainer>
                    {time}
                    <div className="flex">
                        <MessageBubble className={cn({
                            "bg-primary/20":isFromMe
                        })}>
                            <RenderWithMention html={content} />
                        </MessageBubble>
                        <MessageSectionRight />
                    </div>
                        
                </MessageContainer>
                    
                
            </div>  
        </div>
    )
}
export default MessageItem