import { FaSearch, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface SidebarProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
	return (
		<>
			{/* 모바일에서 사이드바 뒤의 오버레이 */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className={`
          fixed inset-0 bg-black bg-opacity-50 z-20
          md:hidden
          ${isOpen ? "block" : "hidden"}
        `}
				onClick={toggleSidebar}
			/>

			{/* 사이드바 */}
			<div
				className={`
          fixed md:static min-h-full z-30 
          min-w-48 px-8 py-10 flex flex-col gap-5 
          bg-neutral-950 text-sm transition-all duration-300 ease-in-out
          ${isOpen ? "left-0" : "-left-48"} md:left-0
        `}
			>
				<NavLink
					to="/search"
					className="flex flex-row gap-3 items-center"
					onClick={() => {
						// 모바일에서만 사이드바 닫기
						if (isOpen) toggleSidebar();
					}}
				>
					<FaSearch />
					찾기
				</NavLink>

				<NavLink
					to="/mypage"
					className="flex flex-row gap-3 items-center"
					onClick={() => {
						// 모바일에서만 사이드바 닫기
						if (isOpen) toggleSidebar();
					}}
				>
					<FaUser />
					마이페이지
				</NavLink>
			</div>
		</>
	);
};

export default Sidebar;
