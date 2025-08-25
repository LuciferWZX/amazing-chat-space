import { PullToLoadMore, type PullToLoadMoreRef } from "@/components";
import { useChat } from "../use-chat";
import { useRef } from "react";
import type { Message } from "wukongimjssdk";
import MessageItem from "./message-item";
import { useIMChat } from "../chat-provider";

const ChatContent = () => {
    const {messages,hasMore,loadMore,isFetching}=useChat()
    const {user}=useIMChat()
    console.warn("messages",messages)
    const viewportRef=useRef<HTMLDivElement | null>(null)
    const listRef=useRef<PullToLoadMoreRef>(null)
    const renderItem=(item:Message)=>{
        return (
            <MessageItem key={item.clientMsgNo} message={item} user={user} />
                
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