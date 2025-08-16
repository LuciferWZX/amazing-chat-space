import { AppInstance } from "@/instances/app-instance";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@amazing-chat/ui";
import type { ReactNode } from "react";
import { stores } from "@amazing-chat/shared";
const {useAppStore,useShallow}=stores
interface LogoutDialogProps {
    children?: ReactNode;
    asChild?: boolean;
}
export const KickedDialog = (props: LogoutDialogProps) => {
    const { children, asChild } = props;
    const kickedOpen=useAppStore(useShallow((state)=>state.kickedOpen))
    return (
        <AlertDialog open={kickedOpen} onOpenChange={(open)=>useAppStore.setState({kickedOpen:open})}>
            {children && 
            <AlertDialogTrigger asChild={asChild}>
                {children}
            </AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>被踢下线</AlertDialogTitle>
          <AlertDialogDescription>
            您已被踢下线，请重新登录。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={AppInstance.kicked}>确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}