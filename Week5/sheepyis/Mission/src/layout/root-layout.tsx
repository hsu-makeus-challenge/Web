import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/navBar";

const RootLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default RootLayout;