import { SidebarInset, SidebarProvider } from "@amazing-chat/ui";
import type { CSSProperties } from "react";
import { Outlet } from "@tanstack/react-router";
import AppSidebar from "./app-sidebar";

const BaseLayout = () => {
    return (
        <SidebarProvider 
            style={{
                "--sidebar-width": "calc(var(--spacing) * 46)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as CSSProperties}>    
            <AppSidebar />
            <SidebarInset>
               <Outlet/>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default BaseLayout;