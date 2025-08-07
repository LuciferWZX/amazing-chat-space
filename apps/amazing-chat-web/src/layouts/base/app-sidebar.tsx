import {
	LucideIcons,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@amazing-chat/ui";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { NavSecondary } from "@/layouts/base/nav-secondary.tsx";
import { NavUser } from "@/layouts/base/nav-user.tsx";

const { HandFist, MessageCircleMore, Settings } = LucideIcons;
// Menu items.
const items = [
	{
		title: "聊天",
		path: "/chat",
		icon: MessageCircleMore,
	},
];
const secondaryItems = [
	{
		title: "设置",
		path: "/setting",
		icon: Settings,
	},
];
type AppSidebarProps = ComponentProps<typeof Sidebar>;
const BASE_PATH = "/base";
const AppSidebar = (props: AppSidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isActive = (path: string) => {
		return location.pathname.startsWith(BASE_PATH + path);
	};
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size={"lg"}
							className={
								"data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
							}
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
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton tooltip={item.title} isActive={isActive(item.path)} asChild>
										<a
											onClick={() =>
												navigate({ to: `${BASE_PATH}${item.path}` })
											}
										>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<NavSecondary items={secondaryItems} className={"mt-auto"} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
export default AppSidebar;
