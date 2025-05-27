import { useMutation } from "@tanstack/react-query";
import { editComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useEditComment(lpId: number, order: "asc" | "desc") {
  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      editComment(lpId, commentId, content),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, {lpId, order}],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("댓글 수정 실패", error);
    },
  });
}

export default useEditComment;