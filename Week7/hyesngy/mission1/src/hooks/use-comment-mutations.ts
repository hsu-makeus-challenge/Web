import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment, deleteComment } from "@apis/comment/comment";
import type { Comment } from "@typedefs/comment";

interface UseCommentMutationsProps {
	comment: Comment;
	lpId: number | string;
	onEditSuccess?: () => void;
	onDeleteSuccess?: () => void;
}

export const useCommentMutations = ({
	comment,
	lpId,
	onEditSuccess,
	onDeleteSuccess,
}: UseCommentMutationsProps) => {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: (content: string) =>
			updateComment(lpId, comment.id, { content }),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
			if (onEditSuccess) onEditSuccess();
		},

		onError: (error) => {
			console.error("댓글 수정 중 오류 발생:", error);
			alert("댓글 수정 중 오류가 발생했습니다.");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteComment(lpId, comment.id),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
			alert("댓글이 삭제되었습니다.");
			if (onDeleteSuccess) onDeleteSuccess();
		},

		onError: (error) => {
			console.error("댓글 삭제 중 오류 발생:", error);
			alert("댓글 삭제 중 오류가 발생했습니다.");
		},
	});

	const handleDeleteWithConfirm = () => {
		if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
			deleteMutation.mutate();
		}
	};

	return {
		updateMutation,
		deleteMutation,
		handleDeleteWithConfirm,
	};
};
