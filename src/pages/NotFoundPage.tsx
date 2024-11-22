import { Link } from "react-router-dom";
import { Loader, Nav } from "../components";

export const NotFoundPage = () => {
    return (
        <div>
            <Loader />
            <Nav />
            <h1>404 - Not Found</h1>
        </div>
    )
}