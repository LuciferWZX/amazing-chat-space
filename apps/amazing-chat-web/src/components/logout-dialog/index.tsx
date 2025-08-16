import { AppInstance } from "@/instances/app-instance";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@amazing-chat/ui";
import type { ReactNode } from "react";
import { stores } from "@amazing-chat/shared";
const {useAppStore,useShallow}=stores
interface LogoutDialogProps {
    children?: ReactNode;
    asChild?: boolean;
}
export const LogoutDialog = (props: LogoutDialogProps) => {
    const { children, asChild } = props;
    const logoutOpen=useAppStore(useShallow((state)=>state.logoutOpen))
    return (
        <AlertDialog open={logoutOpen} onOpenChange={(open)=>useAppStore.setState({logoutOpen:open})}>
            {children && 
            <AlertDialogTrigger asChild={asChild}>
                {children}
            </AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>退出登录</AlertDialogTitle>
          <AlertDialogDescription>
            退出登录后，您将需要重新登录。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={AppInstance.logout}>确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}