import { Outlet } from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";

const RootLayout = () => {
    return (
        <div>
            <Outlet />
            <TanStackRouterDevtools/>
        </div>
    );
};

export default RootLayout;