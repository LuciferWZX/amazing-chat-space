import { SidebarInset, SidebarProvider } from "@amazing-chat/ui";
import { Outlet } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import useIMInit from "@/layouts/base/use-im-init.ts";
import AppSidebar from "./app-sidebar";
import {GlobalSearch} from "@/components";

const BaseLayout = () => {
	useIMInit();
	return (
		<div className={"h-screen w-screen overflow-auto"}>
			<SidebarProvider
				className={"min-h-[unset] size-full"}
				style={
					{
						"--sidebar-width": "calc(var(--spacing) * 46)",
						"--header-height": "calc(var(--spacing) * 12)",
					} as CSSProperties
				}
			>
				<AppSidebar />
				<SidebarInset className={"size-full"}>
					<Outlet />
				</SidebarInset>
				<GlobalSearch/>
				
			</SidebarProvider>
		</div>
	);
};

export default BaseLayout;
