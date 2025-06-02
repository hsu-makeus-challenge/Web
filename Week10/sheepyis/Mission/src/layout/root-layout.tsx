import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="w-[100vw] h-[100vh]">
            <Outlet />
        </div>
    )
}

export default RootLayout;