
import RootLayout from "@/layouts";
import AuthLayout from "@/layouts/auth";
import BaseLayout from "@/layouts/base";
import NotFoundPage from "@/pages/404";
import LoginPage from "@/pages/auth/login";
import ChatPage from "@/pages/chat";
import { types } from "@amazing-chat/shared";

import { createRootRouteWithContext, createRoute, createRouter, redirect } from "@tanstack/react-router";

    //根路由
    const rootRoute = createRootRouteWithContext<{user:types.AppUser|null}>()({
        component: RootLayout,
        notFoundComponent:(data)=><NotFoundPage data={data} redirect={{to:"/",replace:true}}/>,
        beforeLoad:(ctx)=>{
            const pathname= ctx.location.pathname
            const whitePath="/auth/"
            //以whiteRegPath正则开头的通过
            if (pathname.startsWith(whitePath)){
                return
            }
            if (pathname === "/"){
                throw redirect({
                    to:"/base",
                    replace:true
                })
            }
        },
    });
    //用户路由
    const authedRoute = createRoute({
        getParentRoute:()=>rootRoute,
        path:"/base",
        beforeLoad:({location,context})=>{
            const pathname= location.pathname
            const user =context.user
            const isIndex = (pathname === "/base" || pathname === "/base/")
            console.warn("user",user)
            if (!user){
                throw redirect({
                    to:"/auth/login",
                    search:isIndex?{}:{
                        redirect:location.href
                    },
                    replace:true
                })
            }
            if (isIndex){
                throw redirect({
                    to:"/base/chat",
                    replace:true
                })
            }
        },
        notFoundComponent:NotFoundPage,
        component: BaseLayout,

    });
    const chatRoute = createRoute({
        getParentRoute:()=>authedRoute,
        path:"/chat",
        component: ChatPage,
        
    });
    //未登录路由
    const unauthedRoute = createRoute({
        getParentRoute:()=>rootRoute,
        path:"/auth",
        component: AuthLayout,
    });
    const loginRoute = createRoute({
        getParentRoute:()=>unauthedRoute,
        path:"/login",
        component: LoginPage,
    });

    //路由树
    const routeTree = rootRoute.addChildren([
        authedRoute.addChildren([
            chatRoute
        ]),
        unauthedRoute.addChildren([
            loginRoute
        ]),
    ])
    //注册路由
    const router = createRouter({
        notFoundMode:'fuzzy',
        routeTree,
        defaultNotFoundComponent:NotFoundPage,
        context:{
            user:null
        }
    })

    export default router