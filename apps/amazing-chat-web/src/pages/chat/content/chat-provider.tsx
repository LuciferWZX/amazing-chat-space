/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react'
import type { Conversation } from 'wukongimjssdk'
import type { AppUser } from '@/types'
import { createContext, use } from 'react'

interface ChatProviderState {
  conversation: Conversation | undefined
  user: AppUser | undefined
}
interface ChatProviderProps {
  children: ReactNode
  conversation: Conversation | undefined
  user: AppUser | undefined
}
const initialState: ChatProviderState = {
  conversation: undefined,
  user: undefined,
}
export const ChatProviderContext = createContext<ChatProviderState>(initialState)
export function ChatProvider(props: ChatProviderProps) {
  const { children, conversation, user } = props
  return (
    <ChatProviderContext value={{ ...initialState, conversation, user }}>
      {children}
    </ChatProviderContext>
  )
}
export function useIMChat() {
  const context = use(ChatProviderContext)
  if (!context) {
    throw new Error('useIMChat must be used within a ChatProvider')
  }
  return context
}
