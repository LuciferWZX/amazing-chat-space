import { PullToLoadMore } from "@/components";
import { useChat } from "../use-chat";
import type { ChatMessage } from "@/types";
import { useRef } from "react";

const ChatContent = () => {
    const {messages,hasMore,loadMore,isFetching,isPending}=useChat()
    const viewportRef=useRef<HTMLDivElement | null>(null)
    const renderItem=(item:ChatMessage,index:number)=>{
        return (
            <div key={item.id}>
                {index}:{item.content}
            </div>
        )
    }

    return(
       <div className={'flex-1 overflow-auto '}>
         {isPending&&<div>加载中...</div>}
            <PullToLoadMore
                list={messages||[]} 
                hasMore={hasMore} 
                viewportRef={viewportRef}
                renderItem={renderItem}
                onLoadMore={loadMore}
            />
       </div>
    )
}
export default ChatContent;