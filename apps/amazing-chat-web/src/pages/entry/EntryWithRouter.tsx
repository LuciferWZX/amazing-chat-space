import { stores } from "@amazing-chat/shared";
import { RouterProvider } from "@tanstack/react-router";
import router from "@/hooks/router";

const { useAppStore, useShallow } = stores;
const EntryWithRouter = () => {
	const user = useAppStore(useShallow((state) => state.user));
	return <RouterProvider router={router} context={{ user: user }} />;
};

export default EntryWithRouter;
