import LeftSide from "@/pages/chat/left-side";
import Content from "@/pages/chat/content";

const ChatPage = () => {

    return (
        <div className={'size-full overflow-auto'}>
            <div className={'size-full flex overflow-auto'}>
                <LeftSide/>
                <Content/>
            </div>
        </div>
    )
};

export default ChatPage;