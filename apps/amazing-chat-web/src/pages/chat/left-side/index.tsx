import {cn, Label, ScrollArea, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, LucideIcons, Switch } from "@amazing-chat/ui";
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
    <button
        className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={() => useIMStore.setState({globalSearchVisible:true})}
      >
        <span className="flex grow items-center">
          <LucideIcons.SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">Search</span>
        </span>
        <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          ⌘K
        </kbd>
       </button>
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