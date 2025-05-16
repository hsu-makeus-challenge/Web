import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPen, FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteLp } from "@apis/lp/lp";
import type { Lp } from "@typedefs/lp";
import LpEditModal from "./lp-edit-modal";

export interface LpHeaderProps {
	title: string;
	authorName?: string;
	authorAvatar?: string;
	createdAt: string;
	lpId: number;
	lp?: Lp;
}

const LpHeader = ({
	title,
	authorName,
	authorAvatar,
	createdAt,
	lpId,
	lp,
}: LpHeaderProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const deleteLpMutation = useMutation({
		mutationFn: () => deleteLp(lpId),
		onSuccess: (data) => {
			if (data.status) {
				queryClient.invalidateQueries({ queryKey: ["lps"] });
				alert("LP가 성공적으로 삭제되었습니다.");
				navigate("/");
			} else {
				alert("LP 삭제에 실패했습니다.");
			}
		},
		onError: (error: unknown) => {
			console.error("LP 삭제 중 오류 발생:", error);
			alert("LP 삭제 중 오류가 발생했습니다.");
		},
	});

	const handleDelete = () => {
		if (window.confirm("정말로 이 LP를 삭제하시겠습니까?")) {
			deleteLpMutation.mutate();
		}
	};

	const handleEdit = () => {
		setIsEditModalOpen(true);
	};

	return (
		<>
			<div className="w-full flex flex-row justify-between">
				<div className="flex flex-row gap-3 items-center">
					{authorAvatar ? (
						<img
							src={authorAvatar}
							alt={authorName}
							className="w-7 h-7 rounded-full"
						/>
					) : (
						<FaUserCircle size={30} />
					)}

					<p>{authorName}</p>
				</div>
				<p>{createdAt.split("T")[0].replace(/-/g, ".")}</p>
			</div>

			<div className="w-full flex flex-row justify-between">
				<p>{title}</p>
				<div className="flex flex-row gap-5 items-center">
					<button
						type="button"
						onClick={handleEdit}
						className="text-blue-500 hover:text-blue-700 focus:outline-none cursor-pointer"
						aria-label="LP 수정"
						disabled={!lp}
					>
						<FaPen />
					</button>
					<button
						type="button"
						onClick={handleDelete}
						disabled={deleteLpMutation.isPending}
						className="text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
						aria-label="LP 삭제"
					>
						<FaTrashAlt />
					</button>
				</div>
			</div>

			{isEditModalOpen && lp && (
				<LpEditModal lp={lp} onClose={() => setIsEditModalOpen(false)} />
			)}
		</>
	);
};

export default LpHeader;
