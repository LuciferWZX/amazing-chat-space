import { LucideIcons, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@amazing-chat/ui";
import type { ComponentProps } from "react";
import { useLocation, useNavigate } from "react-router";
const { HandFist,MessageCircleMore, Settings } = LucideIcons;
// Menu items.
const items = [
    {
      title: "会话",
      path: "/chat",
      icon: MessageCircleMore,
    },
    {
        title: "设置",
        path: "/setting",
        icon: Settings,
    },
    
  ]
  
type AppSidebarProps = ComponentProps<typeof Sidebar>
const AppSidebar = (props: AppSidebarProps)=>{
    const navigate = useNavigate()
    const location = useLocation()
    const isActive = (path:string)=>{
        return location.pathname.startsWith(path)
    }
    return(
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    size={'lg'}
                    className={"data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"}
                  >
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                      <HandFist />
                    </div>
                      <strong>Amazing</strong>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
                {/* <TeamSwitcher teams={data.teams} /> */}
            </SidebarHeader>
            <SidebarContent>
            <SidebarGroup>
          <SidebarGroupLabel>菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton isActive={isActive(item.path)} asChild>
                    <a onClick={()=>navigate(item.path)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> 
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={data.user} /> */}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
export default AppSidebar;