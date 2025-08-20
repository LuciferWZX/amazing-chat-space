/* eslint-disable react-refresh/only-export-components */
import { createContext, use, type ReactNode } from "react"
import { Channel } from "wukongimjssdk"

type ChatProviderState = {
    channel:Channel|null
}
type ChatProviderProps={
    children:ReactNode
}
const initialState:ChatProviderState = {
    channel:null
}
export const ChatProviderContext = createContext<ChatProviderState>(initialState)
export const ChatProvider = (props: ChatProviderProps) => {
    const {children}=props
    return (
        <ChatProviderContext.Provider value={initialState}>
            {children}
        </ChatProviderContext.Provider>
    )
}
export const useIMChat = () => {
    const context = use(ChatProviderContext)
    if (!context) {
        throw new Error('useIMChat must be used within a ChatProvider')
    }
    return context
}