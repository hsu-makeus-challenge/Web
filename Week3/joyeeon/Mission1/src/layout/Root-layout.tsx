import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const RootLayout = () => {
    return (
        <main className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet/>
        </main>
    )
}

export default RootLayout;