import { SidebarHeader } from "@amazing-chat/ui";
import { useIMChat } from "./chat-provider";
import { useMemo } from "react";

const ChatHeader = () => {
  const {conversation} = useIMChat()
  const channelInfo = useMemo(()=>{
    return conversation?.channelInfo
  },[conversation?.channelInfo])
    return (
          <SidebarHeader className="gap-3.5 bg-sidebar border-b p-4">
            {channelInfo?.title}
          </SidebarHeader>
    )
}

export default ChatHeader;