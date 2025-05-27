import { Outlet } from "react-router-dom";
import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";
import { useState } from "react";
import { useAuth } from "@hooks/auth/use-auth";
import AddLpButton from "@components/button/add-lp-button";

const RootLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { isAuthenticated } = useAuth();

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<div className="flex flex-col h-screen bg-black text-white">
			<Navbar toggleSidebar={toggleSidebar} />
			<div className="flex flex-1 overflow-hidden">
				<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<main className="flex-1 overflow-y-auto p-4 md:p-6">
					<Outlet />
				</main>
			</div>
			{isAuthenticated && <AddLpButton />}
		</div>
	);
};

export default RootLayout;
