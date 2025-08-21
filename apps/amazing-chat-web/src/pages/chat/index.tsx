import { userChatRoute } from "@/hooks/router";
import LeftSide from "@/pages/chat/left-side";
import Content from "@/pages/chat/content";

import {useEffect} from "react";
import {useIMStore} from "@/stores";

const ChatPage = () => {
    const {_splat} = userChatRoute.useParams()
    useEffect(() => {
        useIMStore.setState({
            currentChannelId:_splat ?? null
        })
    }, [_splat]);

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