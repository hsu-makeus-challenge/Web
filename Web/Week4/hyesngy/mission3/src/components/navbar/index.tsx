import { NavLink } from "react-router-dom";
import { authItems, navItems } from "@constants/nav";

const navbar = () => {
	return (
		<nav className="w-full px-10 py-4 flex flex-row justify-between items-center bg-black text-white">
			<div className="flex items-center gap-8">
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
			</div>

			<div className="flex items-center gap-8">
				{authItems.map(({ path, label }) => (
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
			</div>
		</nav>
	);
};

export default navbar;
