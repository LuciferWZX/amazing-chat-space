import useMyColleagues from "@/components/global-search/useMyColleagues.ts";
import { useIMStore } from "@/stores";
import { types } from "@amazing-chat/shared";
import { Avatar, AvatarFallback, AvatarImage, Badge, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, LucideIcons, ScrollArea, Skeleton } from "@amazing-chat/ui";
import { pinyin } from "pinyin-pro";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

const {BadgeCheckIcon}=LucideIcons
type BaseUser = types.BaseUser
interface GlobalSearchProps {
    open?:boolean
    onOpenChange?:(open:boolean)=>void
}
export const GlobalSearch = (props:GlobalSearchProps) => {
    const {open,onOpenChange}=props
    const visible = useIMStore(useShallow(state=>state.globalSearchVisible))
    const _onOpenChange=(v:boolean)=>{
        useIMStore.setState({globalSearchVisible:v})
    }
    const {colleagues,isFetching}=useMyColleagues({enabled:open ?? visible})
    console.warn("data",colleagues)
    console.warn("isFetching",isFetching)
    return(
      <CommandDialog
          open={open ?? visible}
          onOpenChange={onOpenChange ?? _onOpenChange}
          commandProps={{
              filter:(value,search,keywords)=> {
                if (keywords) {
                    for (let i = 0; i < keywords.length; i++) {
                        const keyword = keywords[i]
                        const keywordPinyin = pinyin(keyword,{toneType:'none',separator:''})
                        if (keywordPinyin.includes(search)){
                            return 1
                        }
                    }
                }

                return value.includes(search) ? 1 : 0
                 
              },
              onValueChange:(v)=> {
                  console.warn("v",v)
              }
          }}
      >
          <CommandInput  placeholder="输入关键词..." />
          <CommandList className={'max-h-[unset]'}>
              <ScrollArea  classes={{viewport:'max-h-[80vh]'}}>
                  <CommandEmpty>暂无查询结果</CommandEmpty>
                  <CommandGroup heading="用户">
                      {colleagues?.map((user) => {
                          return (
                              <ColleaguesCommandItem key={user.id} user={user} />
                          )
                      })}
                  </CommandGroup>
                  {/*<CommandSeparator />*/}
                  {/*<CommandGroup heading="Settings">*/}
                  {/*    <CommandItem>*/}
                  {/*        /!*<User />*!/*/}
                  {/*        <span>Profile</span>*/}
                  {/*        <CommandShortcut>⌘P</CommandShortcut>*/}
                  {/*    </CommandItem>*/}
                  {/*    <CommandItem>*/}
                  {/*        /!*<CreditCard />*!/*/}
                  {/*        <span>Billing</span>*/}
                  {/*        <CommandShortcut>⌘B</CommandShortcut>*/}
                  {/*    </CommandItem>*/}
                  {/*    <CommandItem>*/}
                  {/*        /!*<Settings />*!/*/}
                  {/*        <span>Settings</span>*/}
                  {/*        <CommandShortcut>⌘S</CommandShortcut>*/}
                  {/*    </CommandItem>*/}
                  {/*</CommandGroup>*/}
              </ScrollArea>
          </CommandList>
      </CommandDialog>
    )
}
interface ColleaguesCommandItemProps {
    user:BaseUser
}
const ColleaguesCommandItem=(props:ColleaguesCommandItemProps)=>{
    const {user}=props
    const organization=useMemo(()=>{
        if (user.organization){
            return  <Badge
                variant="secondary"
                className="bg-blue-500 dark:bg-blue-600 ml-2"
            >
                <BadgeCheckIcon />
                {user.organization.name}
            </Badge>
        }
        return null
    },[user.organization])
    return(
        <CommandItem key={user.id} keywords={[user.nickname,user.username]}>
            <Avatar className={'size-12 rounded'} >
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                    <Skeleton  />
                </AvatarFallback>
            </Avatar>
            <div>
                <div>
                    {user.nickname}
                    {organization}
                </div>
                <div className={'text-muted-foreground'}>{user.username}</div>
            </div>
        </CommandItem>
    )
}