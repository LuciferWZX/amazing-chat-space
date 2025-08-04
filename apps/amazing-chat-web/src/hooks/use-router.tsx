
import RootLayout from "@/layouts";
import AuthLayout from "@/layouts/auth";
import BaseLayout from "@/layouts/base";
import NotFoundPage from "@/pages/404";
import LoginPage from "@/pages/auth/login";
import ChatPage from "@/pages/chat";
import { useMemo } from "react";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router";
    
export const useRouter=()=>{ 
    const initialRoutes:RouteObject[] = useMemo(()=>{
        return [
            {
                path: "/",
                Component: RootLayout,
                children: [
                    {
                        path: "",
                        Component:  BaseLayout,
                        children: [
                            {path:"",element:<Navigate to="/chat" replace />},
                            {
                                path: "/chat",
                                Component: ChatPage,
                            },
                            {
                                path: "*",
                                Component: NotFoundPage   ,
                            }
                        ],
                    },
                    {
                        path: "",
                        Component: AuthLayout,
                        children:[
                            {
                                path:"/login",
                                Component: LoginPage,
                            }
                        ]
                    },
                ],
            },
        ]
    },[])
    return createBrowserRouter(initialRoutes);
}