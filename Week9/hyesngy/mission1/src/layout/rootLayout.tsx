import { Outlet } from "react-router-dom";
import Header from "../components/header";

const RootLayout = () => {
	return (
		<>
			<Header />
			<main className="pt-16">
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
