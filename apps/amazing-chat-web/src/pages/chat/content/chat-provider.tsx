/* eslint-disable react-refresh/only-export-components */
import { createContext, use, type ReactNode } from "react"
import { Conversation } from "wukongimjssdk"

type ChatProviderState = {

    conversation:Conversation|undefined
}
type ChatProviderProps={
    children:ReactNode
    conversation:Conversation|undefined
}
const initialState:ChatProviderState = {
    conversation:undefined
}
export const ChatProviderContext = createContext<ChatProviderState>(initialState)
export const ChatProvider = (props: ChatProviderProps) => {
    const {children,conversation}=props
    return (
        <ChatProviderContext.Provider value={{...initialState,conversation}}>
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