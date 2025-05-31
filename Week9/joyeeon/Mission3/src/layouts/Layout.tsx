import React from "react";
import Navbar from "../components/navbar/Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="pt-16 mb-0 px-4 bg-gray-100 min-h-screen w-full h-full">{children}</main>
        </>
    );
};

export default Layout;