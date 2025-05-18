import type { Comment } from "@typedefs/comment";
import {
	FaUserCircle,
	FaEllipsisH,
	FaPen,
	FaTrash,
	FaCheck,
	FaTimes,
} from "react-icons/fa";
import { useAuth } from "@hooks/auth/use-auth";
import { useUserInfo } from "@hooks/user/use-user-info";
import { useCommentMenu } from "@hooks/comment/use-comment-menu";
import { useCommentMutations } from "@hooks/comment/use-comment-mutations";
import { useCommentEdit } from "@hooks/comment/use-comment-edit";

interface CommentItemProps {
	comment: Comment;
	lpId: number | string;
}

const CommentItem = ({ comment, lpId }: CommentItemProps) => {
	const { isAuthenticated } = useAuth();
	const { data: userData } = useUserInfo();
	const { isMenuOpen, menuRef, toggleMenu, closeMenu } = useCommentMenu();
	const {
		isEditing,
		editContent,
		startEditing,
		cancelEditing,
		handleContentChange,
		validateContent,
	} = useCommentEdit(comment);

	const isAuthor = userData?.data?.id === comment.authorId;

	const { updateMutation, handleDeleteWithConfirm } = useCommentMutations({
		comment,
		lpId,
		onEditSuccess: () => {
			closeMenu();
			cancelEditing();
		},
	});

	const handleEditClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		startEditing();
		closeMenu();
	};

	const handleSaveEdit = () => {
		if (validateContent()) {
			updateMutation.mutate(editContent);
		}
	};

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		closeMenu();
		handleDeleteWithConfirm();
	};

	return (
		<div className="flex gap-3 py-4 border-b border-zinc-700">
			<div className="flex-shrink-0">
				{comment.author.avatar ? (
					<img
						src={comment.author.avatar}
						alt={comment.author.name}
						className="w-8 h-8 rounded-full"
					/>
				) : (
					<FaUserCircle size={32} className="text-gray-400" />
				)}
			</div>

			<div className="flex-grow">
				<div className="flex items-center justify-between mb-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">{comment.author.name}</span>
						<span className="text-xs text-gray-400">
							{comment.createdAt.split("T")[0].replace(/-/g, ".")}
						</span>
					</div>

					{isAuthenticated && isAuthor && !isEditing && (
						<div className="relative" ref={menuRef}>
							<button
								type="button"
								onClick={toggleMenu}
								className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none"
								aria-label="댓글 메뉴"
							>
								<FaEllipsisH size={16} />
							</button>

							{isMenuOpen && (
								<div className="absolute right-0 w-28 bg-zinc-800 rounded-md shadow-lg z-10">
									<button
										type="button"
										onClick={handleEditClick}
										className="w-full text-left px-4 py-2 hover:bg-zinc-900 flex items-center gap-2 rounded-t-md"
										disabled={updateMutation.isPending}
									>
										<FaPen size={12} /> 수정
									</button>
									<button
										type="button"
										onClick={handleDeleteClick}
										className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-900 flex items-center gap-2 rounded-b-md"
										disabled={updateMutation.isPending}
									>
										<FaTrash size={12} /> 삭제
									</button>
								</div>
							)}
						</div>
					)}
				</div>

				{isEditing ? (
					<div className="flex flex-col gap-2">
						<textarea
							value={editContent}
							onChange={handleContentChange}
							className="w-full p-2 bg-zinc-800 border border-gray-600 rounded text-sm focus:outline-none focus:border-blue-500"
							rows={2}
							disabled={updateMutation.isPending}
						/>

						<div className="flex justify-end gap-2">
							<button
								type="button"
								onClick={cancelEditing}
								className="px-2 py-1 text-xs text-gray-300 hover:text-white"
								disabled={updateMutation.isPending}
							>
								<span className="flex items-center gap-1">
									<FaTimes size={12} /> 취소
								</span>
							</button>
							<button
								type="button"
								onClick={handleSaveEdit}
								className="px-2 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
								disabled={updateMutation.isPending}
							>
								<span className="flex items-center gap-1">
									<FaCheck size={12} />
									{updateMutation.isPending ? "저장 중..." : "저장"}
								</span>
							</button>
						</div>
					</div>
				) : (
					<p className="text-sm text-left break-words">{comment.content}</p>
				)}
			</div>
		</div>
	);
};

export default CommentItem;
