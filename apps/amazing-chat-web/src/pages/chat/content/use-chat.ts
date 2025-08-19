import type { ChatMessage } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { stores } from "@amazing-chat/shared";
const {useAppStore,useShallow}=stores
const fakeMessageMap:Map<number,ChatMessage[]>=new Map([
    [1,[
        {id:"1",content:"你好1"},
        {id:"2",content:"你好2"},
        {id:"3",content:"你好3"},
    ]], 
    [2,[
        {id:"4",content:"你好4"},
        {id:"5",content:"你好5"},
        {id:"6",content:"你好6"},
    ]],
    [3,[    
        {id:"7",content:"你好7"},
        {id:"8",content:"你好8"},
        {id:"9",content:"你好9"},
    ]],
    [4,[
        {id:"10",content:"你好10"},
        {id:"11",content:"你好11"},
        {id:"12",content:"你好12"},
    ]],
    [5,[
        {id:"13",content:"你好13"},
        {id:"14",content:"你好14"},
        {id:"15",content:"你好15"},
    ]],
    [6,[
        {id:"16",content:"你好16"},
        {id:"17",content:"你好17"},
        {id:"18",content:"你好18"},
    ]],
    [7,[
        {id:"19",content:"你好19"},
        {id:"20",content:"你好20"},
        {id:"21",content:"你好21"},
    ]],
    [8,[
        {id:"22",content:"你好22"},
        {id:"23",content:"你好23"},
        {id:"24",content:"你好24"},
    ]],
    [9,[
        {id:"25",content:"你好25"},
        {id:"26",content:"你好26"},
        {id:"27",content:"你好27"},
    ]],
    [10,[
        {id:"28",content:"你好28"},
        {id:"29",content:"你好29"},
        {id:"30",content:"你好30"},
    ]],
    [11,[
        {id:"31",content:"你好31"},
        {id:"32",content:"你好32"},
        {id:"33",content:"你好33"},
    ]]
])

export const useChat = () => {
    const userId = useAppStore(useShallow(state=>state.user!.id))
    //当前页码
    const [page,setPage]=useState<number>(1)
    //后续是否还有更多消息
    const [hasMore,setHasMore]=useState(false)
    //消息列表
    const [messages,setMessages]=useState<ChatMessage[]>([])
    const {isPending,isFetching}=useQuery({
        queryKey:[`chat-${userId}`,page],
        queryFn:async()=>{
            await new Promise(resolve=>setTimeout(resolve,3000))
            const messages=fakeMessageMap.get(page)
            if (messages?.length) {
                setMessages(prev=>[...prev,...messages])
                setHasMore(true)
            }else{
                setHasMore(false)
            }
            return messages
        },
        refetchOnWindowFocus:false,
    })
    const loadMore=()=>{
        console.warn("loadMore current page",page);
        setPage(page+1)
    }
    return {
        messages,
        hasMore,
        isFetching,
        isPending,
        loadMore
    }
}
