import { Outlet } from "react-router-dom";
import Navbar from "@components/navbar";

const RootLayout = () => {
	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<Navbar />
			<main className="w-full mx-auto py-12 px-4 md:px-6 lg:px-8">
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
