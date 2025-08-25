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
    closeToPreviousMessage?:boolean
    closeToNextMessage?:boolean
}
const MessageItem = (props:MessageItemProps) => {
    const {message,className,user,closeToPreviousMessage,closeToNextMessage} = props
   
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
        <div className={cn("group/message pt-0.5",className)}>
            <div className={cn("flex gap-2")}>
                <div className={cn(
                    "flex-shrink-0 w-10",
                    {
                        "flex items-center justify-center":closeToPreviousMessage
                    }
                )}>
                    {closeToPreviousMessage?null:<MessageAvatar />}
                    {closeToPreviousMessage?time:null}
                </div>
                <MessageContainer>
                    {closeToPreviousMessage?null:time}
                    <div className="flex">
                        <MessageBubble 
                            className={cn('rounded-lg',{
                                "bg-primary/20":isFromMe,
                                "rounded-tl-none!":closeToPreviousMessage && isFromMe,
                                "rounded-bl-none!":closeToNextMessage && isFromMe,
                                "rounded-tr-none!":closeToPreviousMessage && !isFromMe,
                                "rounded-br-none!":closeToNextMessage && !isFromMe
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