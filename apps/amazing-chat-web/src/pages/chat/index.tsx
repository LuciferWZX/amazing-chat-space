import { stores } from "@amazing-chat/shared";
import { Button } from "@amazing-chat/ui";

const ChatPage = () => {
    const user = stores.useAppStore(stores.useShallow(state=>state.user));
    console.warn("user",user);
    return (
        <div>
            {user?.username}
        <Button 
        variant="outline"
        onClick={()=>{
            stores.useAppStore.setState({user:user?{
                ...user,
                username:"123"
            }:null});
        }}>
            logout
        </Button>
    </div>
    )
};

export default ChatPage;