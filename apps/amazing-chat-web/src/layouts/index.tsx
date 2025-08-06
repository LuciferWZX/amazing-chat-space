import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => {
	return (
		<div>
			<Outlet />
			<TanStackRouterDevtools position={"top-right"} />
		</div>
	);
};

export default RootLayout;
