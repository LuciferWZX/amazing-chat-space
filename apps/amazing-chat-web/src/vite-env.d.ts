/// <reference types="vite/client" />
import router from "@/hooks/router.tsx";
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}