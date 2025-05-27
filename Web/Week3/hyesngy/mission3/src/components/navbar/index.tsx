import { NavLink } from "react-router-dom";
import { navItems } from "@constants/nav";

const navbar = () => {
	return (
		<nav className="w-full px-10 py-4 flex flex-row items-center gap-8 bg-black text-white">
			{navItems.map(({ path, label }) => (
				<NavLink
					key={path}
					to={path}
					className={({ isActive }) => {
						return isActive ? "text-white font-bold" : "text-gray-400";
					}}
				>
					{label}
				</NavLink>
			))}
		</nav>
	);
};

export default navbar;
