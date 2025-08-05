import { apis, instants, stores, types } from "@amazing-chat/shared";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const {StorageManager}=instants
const {useAppStore}=stores

export const useInitApp = () => {
    const setUser = useAppStore.use.setUser();
    
    // 检查是否在登录页面
    const isPublicPage = window.location.pathname.startsWith('/auth/');
    
    const { data, error, isLoading } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = await apis.getProfile();
            if (response?.code === types.ResponseCode.SUCCESS) {
                setUser({
                    ...response.data,
                    access_token:StorageManager.getToken()!
                });
                return response.data;
            }
            return response;
        },
        retry:false,
        refetchOnWindowFocus:false,
        enabled: !isPublicPage, // 在登录页面时禁用查询
    });
    
    useEffect(() => {
        if (error) {
            console.error("[用户信息获取失败]:", error);
        }
    }, [error]);

    return { data, isLoading: isLoading, error };
};
