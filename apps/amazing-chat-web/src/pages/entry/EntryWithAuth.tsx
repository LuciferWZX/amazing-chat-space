import { useInitApp } from "@/hooks/use-init-app";
import type {ReactNode} from "react";

interface EntryWithAuthProps {
    children: ReactNode;
}
const EntryWithAuth = ({children }: EntryWithAuthProps) => {
    const {  isLoading } = useInitApp();
    if (isLoading) {
        return <div>初始化中...</div>;
    }

	return children;
};

export default EntryWithAuth;