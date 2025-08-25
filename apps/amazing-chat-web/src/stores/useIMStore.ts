import type { Conversation, Message } from 'wukongimjssdk'
import { ConnectStatus } from 'wukongimjssdk'
import { create } from 'zustand/react'

interface IMStoreState {
  // IM连接状态
  connectStatus: ConnectStatus
  // 全局搜索是否可见
  globalSearchVisible: boolean
  // 会话列表
  conversationList: Conversation[]
  // 消息的Map列表，key为channelID/用户的id
  chatMessageMap: Map<string, Message[]>
  // 当前会话的channelID
  currentChannelId: string | null
}
const initialState: IMStoreState = {
  connectStatus: ConnectStatus.Connecting,
  globalSearchVisible: false,
  conversationList: [],
  chatMessageMap: new Map<string, Message[]>(),
  currentChannelId: null,
}
export const useIMStore = create<IMStoreState>(() => {
  return {
    ...initialState,
  }
})
