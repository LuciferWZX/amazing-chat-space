import { PullToLoadMore, type PullToLoadMoreRef } from "@/components";
import { useChat } from "../use-chat";
import { useRef } from "react";
import type { Message } from "wukongimjssdk";

const ChatContent = () => {
    const {messages,hasMore,loadMore,isFetching}=useChat()

    
    const viewportRef=useRef<HTMLDivElement | null>(null)
    const listRef=useRef<PullToLoadMoreRef>(null)
    const renderItem=(item:Message)=>{
        return (
            <div key={item.clientMsgNo}  className="h-14">
                {item.content}
            </div>
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
            />
        )}
            
       </div>
    )
}
export default ChatContent;