import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import SideBar from "../components/sideBar/sideBar";

const RootLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        const isMobile = window.innerWidth < 768;
        const clickedOutside = sidebarRef.current && !sidebarRef.current.contains(event.target as Node);
    
        if (isSidebarOpen && isMobile && clickedOutside) {
            setIsSidebarOpen(false);
        }
    };
    

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isSidebarOpen]);

    return (
        <div className="bg-black text-white">
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex w-full min-h-[calc(100vh-3vw)] relative">
                <div ref={sidebarRef}>
                    <SideBar isOpen={isSidebarOpen} />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default RootLayout;
