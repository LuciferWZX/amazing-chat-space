import { useInitApp } from "@/hooks/use-init-app";

interface EntryWithAuthProps {
    children: React.ReactNode;
}
const EntryWithAuth = ({children }: EntryWithAuthProps) => {
    const {  isLoading } = useInitApp();
    if (isLoading) {
        return <div>初始化中...</div>;
    }

	return children;
};

export default EntryWithAuth;