import { Link } from "react-router-dom";
import { Loader, Nav } from "../components";

export const NotFoundPage = () => {
    return (
        <div>
            <Loader />
            <Nav />
            <h1>404 - 見つかりません</h1>
        </div>
    )
}