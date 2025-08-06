import { type NotFoundRouteProps, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const NotFoundPage = (props:NotFoundRouteProps & {redirect?:Parameters<typeof redirect>[0]}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (props.redirect){
            navigate({...props.redirect})
        }
    }, [navigate, props, props.redirect]);
    return <div>404</div>;
};

export default NotFoundPage;