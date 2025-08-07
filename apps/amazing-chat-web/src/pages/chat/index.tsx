import LeftSide from "@/pages/chat/left-side";
import Content from "@/pages/chat/content";
import RightSide from "@/pages/chat/right-side";

const ChatPage = () => {

    return (
        <div className={'size-full overflow-auto'}>
            <div className={'size-full flex overflow-auto'}>
                <LeftSide/>
                <Content/>
                <RightSide/>
            </div>
        </div>
    )
};

export default ChatPage;