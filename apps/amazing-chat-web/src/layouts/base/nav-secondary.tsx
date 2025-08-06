import {
	type LucideIcons,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@amazing-chat/ui";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type * as React from "react";

type LucideIcon = LucideIcons.LucideIcon;
const BASE_PATH = "/base";
export function NavSecondary({
	items,
	...props
}: {
	items: {
		title: string;
		path: string;
		icon: LucideIcon;
	}[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const navigate = useNavigate();
	const location = useLocation();
	const isActive = (path: string) => {
		return location.pathname.startsWith(BASE_PATH + path);
	};
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								isActive={isActive(item.path)}
								asChild
								size="sm"
							>
								<a onClick={() => navigate({ to: `${BASE_PATH}${item.path}` })}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
