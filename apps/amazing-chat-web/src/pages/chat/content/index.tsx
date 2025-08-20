
import {useRef} from "react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatContent from "./chat-content";
import { ChatProvider } from "./chat-provider";

const Content = () => {
    const ref = useRef<HTMLDivElement|null>(null)

    return(
        <ChatProvider>
            <div className={'relative flex-1 overflow-auto flex flex-col'} ref={ref} >
                <ChatHeader/>
                <ChatContent/>
                <ChatInput expandContainerRef={ref}/>
            </div>
        </ChatProvider>
    )
}
export default Content