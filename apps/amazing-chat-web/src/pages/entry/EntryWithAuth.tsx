import { useInitApp } from "@/hooks/use-init-app";

interface EntryWithAuthProps {
    children: React.ReactNode;
}
const EntryWithAuth = ({children }: EntryWithAuthProps) => {
    const { data, isLoading } = useInitApp();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!data) {
        return <div>No data</div>;
    }
	return children;
};

export default EntryWithAuth;