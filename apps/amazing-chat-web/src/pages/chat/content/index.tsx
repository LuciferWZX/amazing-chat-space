
import {useRef} from "react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatContent from "./chat-content";

const Content = () => {
    const ref = useRef<HTMLDivElement|null>(null)

    return(
        <div className={'relative flex-1 overflow-auto flex flex-col'} ref={ref} >
            <ChatHeader/>
            <ChatContent/>
            <ChatInput expandContainerRef={ref}/>
        </div>
    )
}
export default Content