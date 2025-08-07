import { SidebarInset, SidebarProvider } from "@amazing-chat/ui";
import type { CSSProperties } from "react";
import { Outlet } from "@tanstack/react-router";
import AppSidebar from "./app-sidebar";

const BaseLayout = () => {
    return (
        <div className={'h-screen w-screen overflow-auto'}>
            <SidebarProvider
                className={"min-h-[unset] size-full"}
                style={{
                    "--sidebar-width": "calc(var(--spacing) * 46)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as CSSProperties}>
                <AppSidebar />
                <SidebarInset className={'size-full'}>
                    <Outlet/>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default BaseLayout;