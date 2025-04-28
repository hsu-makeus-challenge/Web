import { NavLink } from "react-router-dom";
import { authItems, navItems } from "@constants/nav";
import { useAuth } from "@context/AuthContext";

const navbar = () => {
	const { isAuthenticated, logout } = useAuth();

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
				{isAuthenticated ? (
					<>
						<NavLink
							to="/mypage"
							className={({ isActive }) => {
								return isActive ? "text-white font-bold" : "text-gray-400";
							}}
						>
							마이페이지
						</NavLink>

						<button
							type="button"
							onClick={logout}
							className="text-gray-400 cursor-pointer"
						>
							로그아웃
						</button>
					</>
				) : (
					authItems.map(({ path, label }) => (
						<NavLink
							key={path}
							to={path}
							className={({ isActive }) => {
								return isActive ? "text-white font-bold" : "text-gray-400";
							}}
						>
							{label}
						</NavLink>
					))
				)}
			</div>
		</nav>
	);
};

export default navbar;
