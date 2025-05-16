import { NavLink } from "react-router-dom";
import { authItems } from "@constants/nav";
import { useAuth } from "@hooks/use-auth";
import type { UserInfo } from "@typedefs/user";
import { getUserInfo } from "@apis/user/user";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

interface NavbarProps {
	toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const { isAuthenticated, logout } = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			const fetchUserInfo = async () => {
				try {
					const response = await getUserInfo();
					setUserInfo(response.data);
				} catch (error) {
					console.log("🚀 ~ fetchUserInfo ~ error:", error);
				}
			};
			fetchUserInfo();
		}
	}, [isAuthenticated]);

	return (
		<nav className="w-full px-8 py-4 flex flex-row justify-between items-center bg-neutral-950">
			<div className="flex items-center gap-6">
				<button
					type="button"
					className="block md:hidden cursor-pointer"
					onClick={toggleSidebar}
				>
					<FaBars />
				</button>
				<NavLink to="/" className="text-white font-bold">
					LP 스토어
				</NavLink>
			</div>

			<div className="flex items-center gap-8">
				{isAuthenticated ? (
					<>
						<p>{`${userInfo?.name}님 반갑습니다.`}</p>

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

export default Navbar;
