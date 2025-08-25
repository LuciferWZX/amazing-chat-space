/* eslint-disable react-refresh/only-export-components */
import type { AppUser } from "@/types"
import { createContext, use, type ReactNode } from "react"
import { Conversation } from "wukongimjssdk"

type ChatProviderState = {
    conversation:Conversation|undefined
    user:AppUser|undefined
}
type ChatProviderProps={
    children:ReactNode
    conversation:Conversation|undefined
    user:AppUser|undefined
}
const initialState:ChatProviderState = {
    conversation:undefined,
    user:undefined
}
export const ChatProviderContext = createContext<ChatProviderState>(initialState)
export const ChatProvider = (props: ChatProviderProps) => {
    const {children,conversation,user}=props
    return (
        <ChatProviderContext.Provider value={{...initialState,conversation,user}}>
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