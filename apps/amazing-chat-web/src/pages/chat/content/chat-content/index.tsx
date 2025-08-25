import { PullToLoadMore, type PullToLoadMoreRef } from "@/components";
import { useChat } from "../use-chat";
import { useRef } from "react";
import type { Message } from "wukongimjssdk";
import MessageItem from "./message-item";
import { useIMChat } from "../chat-provider";
import { isCloseToPreviousMessage } from "@/utils/format";

const ChatContent = () => {
    const {messages,hasMore,loadMore,isFetching}=useChat()
    const {user}=useIMChat()
    console.warn("messages",messages)
    const viewportRef=useRef<HTMLDivElement | null>(null)
    const listRef=useRef<PullToLoadMoreRef>(null)
    const renderItem=(item:Message,index:number)=>{
        const prevTimestamp=index===0?undefined:messages[index-1].timestamp
        const nextTimestamp=index===messages.length-1?undefined:messages[index+1].timestamp
        //判断上一个消息的
        const closeToPreviousMessage=prevTimestamp?isCloseToPreviousMessage(item.timestamp*1000,prevTimestamp*1000):false
        //判断下一个消息的
        const closeToNextMessage=nextTimestamp?isCloseToPreviousMessage(item.timestamp*1000,nextTimestamp*1000):false
        console.warn("closeToPreviousMessage",closeToPreviousMessage)
        console.warn("closeToNextMessage",closeToNextMessage)
        return (
            <MessageItem 
                key={item.clientMsgNo} 
                message={item} 
                user={user} 
                closeToPreviousMessage={closeToPreviousMessage} 
                closeToNextMessage={closeToNextMessage}
            />
                
        )
    }

    return(
       <div className={'flex-1 overflow-auto '}>
         {isFetching?(
            <div>加载中...</div>
        ):(
        <PullToLoadMore
                ref={listRef}
                list={messages||[]} 
                hasMore={hasMore} 
                viewportRef={viewportRef}
                renderItem={renderItem}
                onLoadMore={loadMore}
                footer={<div className={'h-5'} />}
            />
        )}
            
       </div>
    )
}
export default ChatContent;