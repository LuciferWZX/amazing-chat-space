
import router from "@/hooks/router";
import { RouterProvider } from "@tanstack/react-router";
import {stores} from '@amazing-chat/shared'
const {useAppStore,useShallow}=stores
const EntryWithRouter = () => {
    const user = useAppStore(useShallow(state=>state.user))
    console.warn("---user",user)
    return <RouterProvider router={router} context={{user:user}} />;
};

export default EntryWithRouter;