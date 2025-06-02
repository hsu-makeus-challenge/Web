import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

const RootLayout = () => {
    return (
        <div className="w-[100vw] h-[100vh]">
            <Header />
            <Outlet />
        </div>
    )
}

export default RootLayout;