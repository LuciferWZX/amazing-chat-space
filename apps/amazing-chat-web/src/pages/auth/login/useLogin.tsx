import { apis, instants, stores, types } from "@amazing-chat/shared";
import { LucideIcons, toast } from "@amazing-chat/ui";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useRouter } from "@tanstack/react-router";
const { login, getProfile } = apis;
const { ResponseCode } = types;

const { useAppStore } = stores;
const { StorageManager } = instants;
export const useLogin = () => {
	const location = useLocation();
	const router = useRouter();
	const navigate = useNavigate();

	const { mutate, isPending } = useMutation({
		mutationFn: async (params: Parameters<typeof login>[0]) => {
			toast.dismiss();
			toast.warning("登录中...", {
				icon: <LucideIcons.Loader size={16} className={"animate-spin"} />,
				id: "login_id",
				duration: Infinity,
			});
			const response = await login(params);
			
			if (response?.code === ResponseCode.SUCCESS && response?.data) {
				//保存成功
				StorageManager.setToken(response.data.access_token);

				const profileResponse = await getProfile();
				if (
					profileResponse?.code === ResponseCode.SUCCESS &&
					profileResponse?.data
				) {
					//设置用户信息
					useAppStore.setState(() => {
						return {
							user: {
								...profileResponse.data,
								access_token: response.data.access_token,
							},
						};
					});
					router.invalidate();
					toast.success("登录成功", {
						icon: undefined,
						id: "login_id",
						duration: undefined,
					});
					const search = location.search as { redirect?: string };
					if (search.redirect) {
						navigate({ to: search.redirect, replace: true });
					} else {
						navigate({ to: "/", replace: true });
					}
				}
			} else {
				toast.dismiss("login_id");
			}
		},
	});

	return {
		mutate,
		isPending,
	};
};
