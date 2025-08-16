import { PullToLoadMore } from "@/components";

const ChatContent = () => {

    return(
       <div className={'flex-1 overflow-auto '}>
            <PullToLoadMore/>
       </div>
    )
}
export default ChatContent;