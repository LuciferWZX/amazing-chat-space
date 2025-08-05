import type {NotFoundRouteProps} from "@tanstack/react-router";

const NotFoundPage = (props:NotFoundRouteProps) => {
    console.warn("Not Found", props);
    return <div>404</div>;
};

export default NotFoundPage;