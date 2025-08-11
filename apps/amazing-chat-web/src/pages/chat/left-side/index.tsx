import {cn, Label, ScrollArea, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput, Switch } from "@amazing-chat/ui";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import ConversationItem from "./ConversationItem";
import {useIMStore} from "@/stores";
import {useShallow} from "zustand/react/shallow";
import {ConnectStatus} from "wukongimjssdk";

const IMStatusTag=()=>{
    const status = useIMStore(useShallow(state => state.connectStatus))
    const textMap:Record<ConnectStatus, string> = {
        [ConnectStatus.Connecting]:"连接中",
        [ConnectStatus.ConnectFail]:"连接失败",
        [ConnectStatus.Disconnect]:"已断开连接",
        [ConnectStatus.Connected]:"已连接",
        [ConnectStatus.ConnectKick]:"Kick",
    }
    return(
        <span className={cn(' text-sm',{
            'text-green-600':ConnectStatus.Connected === status,
            'text-red-600':ConnectStatus.Disconnect === status ||ConnectStatus.ConnectKick === status,
        })}>
            {textMap[status]}
        </span>
    )
}
const LeftSide = () => {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(()=>{
        gsap.fromTo(
            ref.current,
            { x: -100, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 0.6, 
                ease: "power2.out",
            }
        );
    },{scope:ref})
    return(
        <aside ref={ref} className={'bg-sidebar flex flex-col overflow-auto  border-sidebar-border border-r w-80'}>

            <SidebarHeader className="gap-3.5 border-b p-4">
                <div className="flex w-full items-center justify-between">
                    <div className="text-foreground text-base font-medium">
                       聊天 <IMStatusTag/>
                    </div>
                    <Label className="flex items-center gap-2 text-sm">
                        <span>Unreads</span>
                        <Switch className="shadow-none" />
                    </Label>
                </div>
                <SidebarInput onFocus={()=>useIMStore.setState({globalSearchVisible:true})}  placeholder="Type to search..." />
            </SidebarHeader>
            <SidebarContent className={" flex-1 overflow-auto"}>
                <ScrollArea type={'always'} className={'h-full'}>
                    <SidebarGroup className="px-3">

                        <SidebarGroupContent>
                            <ConversationItem
                                // avatar={'https://avatars.githubusercontent.com/u/61993236'}
                                shortContext={'你好'}
                                username={'孙悟空'}
                                time={"2023/2/3"}/>

                        </SidebarGroupContent>

                    </SidebarGroup>
                </ScrollArea>
            </SidebarContent>
        </aside>
    )
}
export default LeftSide