import LeftSide from "@/pages/chat/left-side";
import Content from "@/pages/chat/content";
import { ChatProvider } from "./content/chat-provider";

const ChatPage = () => {

    return (
        <div className={'size-full overflow-auto'}>
            <div className={'size-full flex overflow-auto'}>
                <LeftSide/>
                <ChatProvider>
                    <Content/>
                </ChatProvider>
            </div>
        </div>
    )
};

export default ChatPage;