import {useAppForm} from "@/hooks/use-app-form";
import { Button, Card, CardContent, cn, z } from "@amazing-chat/ui";
import {revalidateLogic} from "@tanstack/react-form";
import type { ComponentProps } from "react";
import loginBg from "@/assets/login-bg.jpg";
import { useLogin } from "./useLogin";
const LoginForm = ({ className, ...props }: ComponentProps<"div">) => {
const { mutateAsync: login } = useLogin();

    const form = useAppForm({
        defaultValues:{
            username:"",
            password:""
        },
        validationLogic:revalidateLogic(),
        validators:{
            onDynamic:z.object({
                username: z.string().min(1, {
                    message: "请输入用户名",
                }).min(2, {
                    message: "用户名长度不能小于2",
                }),
                password: z.string().min(1, {
                    message: "请输入密码",
                }),
            })
        },
        onSubmit:async ({value})=>{
            await login({ username: value.username, password: value.password });
            // formApi.reset()
        }
    })
    return(
        <form 
            
            onSubmit={e=>{
                e.preventDefault()
                // e.stopPropagation()
                form.handleSubmit()
            }}>
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <div className="p-6 md:p-8">
								<div className="flex flex-col gap-6">
									<div>
                                        <div className="flex flex-col items-center text-center">
										<h1 className="text-2xl font-bold">
											Welcome to Amazing Chat
										</h1>
										<p className="text-muted-foreground text-balance">
											登录您的账号
										</p>
									</div>
									<div className="grid gap-3">
										 <form.AppField 
                                            name={"username"}
                                            children={(field)=>{
                                                return <field.TextField label="用户名" autoComplete="username" placeholder="用户名" />
                                            }}
                                        />
									</div>
									<div className="grid gap-3 ">
                                        <form.AppField 
                                            name={"password"}
                                            children={(field)=>{
                                                return <field.TextField label="密码" type="password" autoComplete="current-password" placeholder="密码" />
                                            }}
                                        />
									</div>
                                    </div>
                                    <form.AppForm>
                                        <form.SubscribeButton submittingText="登录中...">登录</form.SubscribeButton>
                                    </form.AppForm>
								
								
									<div className="text-center text-sm">
										没有账号?{" "}
										<a
											href="/register"
											className="underline underline-offset-4"
											aria-label="注册"
										>
											注册
										</a>
									</div>
								</div>
							</div>
                           <div className="bg-muted relative hidden md:block">
                                <img
                                    src={loginBg}
                                    alt="登录背景"
                                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                />
                            </div>

                            
                        </CardContent>
                    </Card>
                </div>
            
        </form>
    )
}

export default LoginForm;