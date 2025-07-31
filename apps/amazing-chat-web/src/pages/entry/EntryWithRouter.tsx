import { useRouter } from "@/hooks/use-router";
import { RouterProvider } from "react-router";

const EntryWithRouter = () => {
    const router = useRouter();
    return <RouterProvider router={router} />;
};

export default EntryWithRouter;