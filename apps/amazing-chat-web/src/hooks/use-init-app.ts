import { stores, type AppUser } from "@amazing-chat/shared";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const getUserInfo = async (): Promise<AppUser> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = {
                id: "1",
                uid: "user_123",
                username: "johndoe",
                nickname: "John Doe",
                email: "john.doe@example.com",
                avatar: "https://via.placeholder.com/150",
            }
            stores.useAppStore.getState().setUser(user);
            resolve(user);
        }, 1000);
    })
};

export const useInitApp = () => {
    const setUser = stores.useAppStore.use.setUser();

    const { data, isLoading, error } = useQuery({
        queryKey: ["userInfo"],
        queryFn: getUserInfo,
    });

    // 使用 useEffect 来处理成功和错误回调
    useEffect(() => {
        if (data) {
            // 将用户信息存储到 store 中
            setUser(data);
            console.log("用户信息获取成功:", data);
        }
    }, [data, setUser]);

    useEffect(() => {
        if (error) {
            console.error("用户信息获取失败:", error);
        }
    }, [error]);

    return { data, isLoading, error };
};
