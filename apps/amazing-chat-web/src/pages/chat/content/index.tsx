import { stores } from '@amazing-chat/shared'
import { useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useIMStore } from '@/stores'
import ChatContent from './chat-content'
import ChatHeader from './chat-header'
import ChatInput from './chat-input'
import { ChatProvider } from './chat-provider'

const { useAppStore } = stores
function Content() {
  const conversation = useIMStore(useShallow((state) => {
    return state.conversationList.find(item => item.channel.channelID === state.currentChannelId)
  }))
  const user = useAppStore(useShallow(state => state.user))
  const ref = useRef<HTMLDivElement | null>(null)
  if (!conversation) {
    return <div className="size-full flex-1 flex items-center justify-center">你真棒~值得一朵小红花</div>
  }
  return (
    <ChatProvider conversation={conversation} user={user ?? undefined}>
      <div className="relative flex-1 overflow-auto flex flex-col" ref={ref}>
        <ChatHeader />
        <ChatContent />
        <ChatInput expandContainerRef={ref} />
      </div>
    </ChatProvider>
  )
}
export default Content
