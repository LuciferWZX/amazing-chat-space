
import router from "@/hooks/router";
import { RouterProvider } from "@tanstack/react-router";

const EntryWithRouter = () => {
    return <RouterProvider router={router} />;
};

export default EntryWithRouter;