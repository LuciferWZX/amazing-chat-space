import { ScrollArea, SidebarGroup, SidebarGroupContent } from "@amazing-chat/ui"
import ConversationItem from "./ConversationItem"
import { useIMStore } from "@/stores/useIMStore"
import { useShallow } from "zustand/react/shallow"
import { memo } from "react"

const ConversationContainer=()=>{
    const conversationList=useIMStore(useShallow(state=>state.conversationList))

    if(conversationList.length===0){
        return (
            <div className="flex-1 flex items-center text-muted-foreground justify-center">
                <span>暂无会话</span>
            </div>
        )
    }
    return(
         <ScrollArea type={'always'} className={'h-full'}>
            <SidebarGroup className="px-3">

                <SidebarGroupContent>
                    <ConversationItem
                        // avatar={'https://avatars.githubusercontent.com/u/61993236'}
                        shortContext={'你好'}
                        username={'孙悟空'}
                        time={"2023/2/3"}/>

                </SidebarGroupContent>

            </SidebarGroup>
        </ScrollArea>
    )
}
export default memo(ConversationContainer)