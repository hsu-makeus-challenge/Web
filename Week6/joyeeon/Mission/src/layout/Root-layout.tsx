import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";

const RootLayout = () => {
    return (
        <main className="flex h-screen flex-col">
        <SidebarProvider>
        <Navbar />
        <div className="flex flex-1">
            <Sidebar/>
            <div className="flex-1 flex items-center justify-center">
                <Outlet/>
            </div>
        </div> 
        </SidebarProvider>  
        </main>
    )
}

export default RootLayout;