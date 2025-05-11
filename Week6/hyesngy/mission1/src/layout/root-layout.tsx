import { Outlet } from "react-router-dom";
import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";
import { useState } from "react";

const RootLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// 사이드바 토글 함수
	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<div className="flex flex-col min-h-screen bg-black text-white">
			<Navbar toggleSidebar={toggleSidebar} />
			<main className="w-full flex flex-1">
				<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<div className="flex-1 p-4 md:p-6">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default RootLayout;
