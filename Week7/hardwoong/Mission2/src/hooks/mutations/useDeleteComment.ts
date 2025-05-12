import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteComment(lpId: number, order: "asc" | "desc") {
  return useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, {lpId, order}],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("댓글 삭제에 실패했습니다.", error);
    },
  });
}

export default useDeleteComment;