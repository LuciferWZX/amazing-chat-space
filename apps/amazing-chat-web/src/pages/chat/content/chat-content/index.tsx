import type { Message } from 'wukongimjssdk'
import type { PullToLoadMoreRef } from '@/components'
import { useEventBus } from '@amazing-chat/shared'
import { Button, LucideIcons } from '@amazing-chat/ui'
import { useRef, useState } from 'react'
import { ChannelTypePerson } from 'wukongimjssdk'
import { PullToLoadMore } from '@/components'
import { isCloseToPreviousMessage, isSameDay } from '@/utils/format'
import { useIMChat } from '../chat-provider'
import { useChat } from '../use-chat'
import MessageItem from './message-item'

const { ArrowDownFromLine } = LucideIcons
function ChatContent() {
  const { user, conversation } = useIMChat()
  const { messages, hasMore, loadMore, isFetching } = useChat()
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<PullToLoadMoreRef>(null)
  const [isLimit, setIsLimit] = useState(false)
  useEventBus(`scroll-to-message`, (messageID: string) => {
    console.warn('messageID', messageID)
    const message = messages.find(item => item.messageID === messageID)
    console.warn('message:', message)

    if (message && !isLimit) {
      listRef.current?.scrollBottom?.()
    }
  })
  useEventBus(`scroll-to-bottom`, () => {
    listRef.current?.scrollBottom?.()
  })
  const getFallback = (nickname: string) => {
    return nickname.slice(0, 2)
  }
  const getFromUser = (item: Message): {
    id: string
    avatar: string
    nickname: string
    fallback: string
  } => {
    if (item.fromUID === user?.id) {
      return {
        id: user.id,
        avatar: user.avatar,
        nickname: user.nickname,
        fallback: getFallback(user.nickname),
      }
    }
    if (conversation?.channel.channelType === ChannelTypePerson) {
      // 单聊
      const channelInfo = conversation.channelInfo
      return {
        id: channelInfo?.channel.channelID || '',
        avatar: channelInfo?.logo || '',
        nickname: channelInfo?.title || '',
        fallback: getFallback(channelInfo?.title || ''),
      }
    }
    return {
      id: '',
      avatar: '',
      nickname: '',
      fallback: '',
    }
  }
  const renderItem = (item: Message, index: number) => {
    const prevTimestamp = index === 0 ? undefined : messages[index - 1].timestamp
    const nextTimestamp = index === messages.length - 1 ? undefined : messages[index + 1].timestamp
    const isSamePreviousUser = prevTimestamp ? messages[index - 1].fromUID === item.fromUID : false
    const isSameNextUser = nextTimestamp ? messages[index + 1].fromUID === item.fromUID : false
    // 判断上一个消息的
    const closeToPreviousMessage = prevTimestamp ? isCloseToPreviousMessage(item.timestamp * 1000, prevTimestamp * 1000) && isSamePreviousUser : false
    // 判断下一个消息的
    const closeToNextMessage = nextTimestamp ? isCloseToPreviousMessage(nextTimestamp * 1000, item.timestamp * 1000) && isSameNextUser : false
    const showDate = index > 0 ? !isSameDay(item.timestamp * 1000, messages[index - 1].timestamp * 1000) : true
    return (
      <MessageItem
        showDate={showDate}
        key={item.clientMsgNo}
        clientUser={user!}
        message={item}
        user={getFromUser(item)}
        closeToPreviousMessage={closeToPreviousMessage}
        closeToNextMessage={closeToNextMessage}
      />

    )
  }

  return (
    <div className="flex-1 overflow-auto relative">
      {isFetching
        ? (
            <div>加载中...</div>
          )
        : (
            <PullToLoadMore
              ref={listRef}
              list={messages || []}
              hasMore={hasMore}
              onLimit={(isLimit) => {
                setIsLimit(isLimit)
              }}
              viewportRef={viewportRef}
              renderItem={renderItem}
              onLoadMore={loadMore}
              footer={<div className="h-5" />}
            />
          )}
      {isLimit && (
        <Button
          className="size-10 border border-primary absolute bg-muted bottom-10 z-10 right-10 rounded-full"
          onClick={() => {
            listRef.current?.scrollBottom?.()
          }}
        >
          <ArrowDownFromLine />
        </Button>
      )}
    </div>
  )
}
export default ChatContent
