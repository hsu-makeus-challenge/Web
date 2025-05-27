import { Link } from "react-router-dom";
import { useAuth } from "@hooks/use-auth";
import { useUserInfo } from "@hooks/use-user-info";

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();
	const { data: userInfoResponse } = useUserInfo();
	const userInfo = userInfoResponse?.data;

	return (
		<nav className="bg-zinc-800 sticky top-0 z-10">
			<div className="flex items-center justify-between px-8 py-4">
				<Link to="/" className="text-white font-bold">
					LP 스토어
				</Link>
				<div className="flex items-center gap-8">
					{isAuthenticated && userInfo ? (
						<div className="flex items-center gap-2">
							<Link to="/mypage" className="hover:text-blue-300">
								{userInfo.name}님 반갑습니다.
							</Link>
							<button
								type="button"
								onClick={logout}
								className="text-gray-400 cursor-pointer"
							>
								로그아웃
							</button>
						</div>
					) : (
						<>
							<Link to="/login" className="text-gray-400 hover:text-white">
								로그인
							</Link>
							<Link to="/register" className="text-gray-400 hover:text-white">
								회원가입
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
