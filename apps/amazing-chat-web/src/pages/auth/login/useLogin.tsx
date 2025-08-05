import { apis } from "@amazing-chat/shared";
import { LucideIcons, toast } from "@amazing-chat/ui";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const { login } = apis;
export const useLogin = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: login,
		onError: (error) => {
			// 错误处理
			console.error("登录失败:", error);
		},
		onSettled: () => {
			// 无论成功失败都会执行
			console.log("操作完成");
		},
	});
	useEffect(() => {
		console.warn("isPending", isPending);
		if (isPending) {
			toast.warning("登录中...", {
				icon: <LucideIcons.Loader size={16} className={"animate-spin"} />,
				id: "login_id",
				duration: Infinity,
			});
		} else {
			toast.dismiss("login_id");
		}
	}, [isPending]);
	return {
		mutate,
		isPending,
	};
};
