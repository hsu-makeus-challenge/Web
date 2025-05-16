import { withdrawUser } from "@apis/user/user";
import WithdrawalModal from "@components/modal/withdraw-modal";
import { useAuth } from "@hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

interface SidebarProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const { logout } = useAuth();

	const withdrawalMutation = useMutation({
		mutationFn: withdrawUser,
		onSuccess: () => {
			setIsModalOpen(false);
			logout();
			navigate("/");
			alert("회원 탈퇴가 완료되었습니다.");
		},
		onError: (error: unknown) => {
			console.log("🚀 ~ Sidebar ~ error:", error);
			alert("회원 탈퇴에 실패했습니다. 다시 시도해 주세요.");
		},
	});

	const handleConfirmWithdrawal = () => {
		withdrawalMutation.mutate();
	};

	return (
		<>
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
          fixed md:static h-[calc(100vh-56px)] z-30 
          min-w-48 px-8 py-10 flex flex-col justify-between
          bg-neutral-950 text-sm transition-all duration-300 ease-in-out
          ${isOpen ? "left-0" : "-left-48"} md:left-0
        `}
			>
				<div className="flex flex-col gap-5">
					<NavLink
						to="/search"
						className="flex flex-row gap-3 items-center"
						onClick={() => {
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
							if (isOpen) toggleSidebar();
						}}
					>
						<FaUser />
						마이페이지
					</NavLink>
				</div>

				<button
					type="button"
					className="flex rounded-md py-2 justify-center cursor-pointer bg-neutral-800 hover:bg-neutral-900 transition-all duration-300 ease-in-out"
					onClick={() => setIsModalOpen(true)}
				>
					탈퇴하기
				</button>
			</div>

			<WithdrawalModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleConfirmWithdrawal}
				isLoading={withdrawalMutation.isPending}
			/>
		</>
	);
};

export default Sidebar;
