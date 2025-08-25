import { stores } from '@amazing-chat/shared'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import WKSDK, { PullMode } from 'wukongimjssdk'
import { useIMStore } from '@/stores/useIMStore'
import { useIMChat } from './chat-provider'

const { useShallow } = stores

export function useChat() {
  const { conversation } = useIMChat()
  // 后续是否还有更多消息
  const [hasMore, setHasMore] = useState(true)
  // 消息列表
  const messages = useIMStore(useShallow(state => state.chatMessageMap.get(conversation?.channel.channelID || '') || []))
  // const disabled = useMemo(() => {
  //   return (messages?.[0]?.messageSeq === 1)
  // }, [messages])
  const { isPending, isFetching } = useQuery({
    queryKey: [`messages-${conversation?.channel.channelID}`],
    queryFn: async () => {
      return syncMessages()
    },
    enabled: hasMore,
    retry: false,
    refetchOnWindowFocus: false,
  })
  async function syncMessages() {
    if (!conversation) {
      throw new Error('conversation is null')
    }
    const remoteMessages = await WKSDK.shared().chatManager.syncMessages(conversation.channel, {
      pullMode: PullMode.Down,
      startMessageSeq: messages.length > 0 ? messages[0].messageSeq - 1 : 0,
      limit: 10,
      endMessageSeq: 0,
    })
    if (remoteMessages.length > 0) {
      const firstMessage = remoteMessages[0]
      if (firstMessage.messageSeq > 1) {
        setHasMore(true)
      }
      else {
        setHasMore(false)
      }
    }
    useIMStore.setState((oldState) => {
      const chatMessage = oldState.chatMessageMap.get(conversation.channel.channelID)

      return {
        chatMessageMap: oldState.chatMessageMap.set(conversation.channel.channelID, chatMessage ? [...remoteMessages, ...chatMessage] : remoteMessages),
      }
    })
    return remoteMessages
  }
  async function loadMore() {
    await syncMessages()
  }
  return {
    messages,
    hasMore,
    isFetching,
    isPending,
    loadMore,
  }
}
