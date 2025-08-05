
import RootLayout from "@/layouts";
import AuthLayout from "@/layouts/auth";
import BaseLayout from "@/layouts/base";
import NotFoundPage from "@/pages/404";
import LoginPage from "@/pages/auth/login";
import ChatPage from "@/pages/chat";
import { stores } from "@amazing-chat/shared";
import { createRootRoute, createRoute, createRouter, redirect } from "@tanstack/react-router";

    //根路由
    const rootRoute = createRootRoute({
        component: RootLayout,
        beforeLoad:(ctx)=>{
            console.warn("__root")
            const pathname= ctx.location.pathname
            const whitePath="/auth/"
            //以whiteRegPath正则开头的通过
            if (pathname.startsWith(whitePath)){
                return
            }
            
            const user = stores.useAppStore.getState().user;
            if (!user){
                throw redirect({
                    to:"/auth/login",
                    replace:true
                })
            }
            console.warn("当前用户信息",user)
            if (ctx.location.pathname === "/"){
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
        beforeLoad:(ctx)=>{
            const pathname= ctx.location.pathname
            if (pathname === "/base" || pathname === "/base/"){
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
        defaultNotFoundComponent:NotFoundPage
    })

    export default router