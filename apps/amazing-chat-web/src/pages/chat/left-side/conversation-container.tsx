import { ScrollArea, SidebarGroup, SidebarGroupContent } from '@amazing-chat/ui'
import { memo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useIMStore } from '@/stores/useIMStore'
import ConversationItem from './ConversationItem'

function ConversationContainer() {
  const currentUserId = useIMStore(useShallow(state => state.currentChannelId))
  const conversationList = useIMStore(useShallow(state => state.conversationList))
  if (conversationList.length === 0) {
    return (
      <div className="flex-1 flex items-center text-muted-foreground justify-center">
        <span>暂无会话</span>
      </div>
    )
  }
  return (
    <ScrollArea type="always" className="h-full" classes={{ viewport: '[&>div]:flex!' }}>
      <SidebarGroup className="px-3">

        <SidebarGroupContent>
          {conversationList.map((conversation) => {
            return (
              <ConversationItem
                active={currentUserId === conversation.channel.channelID}
                key={conversation.channel.channelID}
                conversation={conversation}
                // avatar={'https://avatars.githubusercontent.com/u/61993236'}
              />
            )
          })}

        </SidebarGroupContent>

      </SidebarGroup>
    </ScrollArea>
  )
}
export default memo(ConversationContainer)
