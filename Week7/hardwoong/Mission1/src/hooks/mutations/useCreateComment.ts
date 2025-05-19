import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useCreateComment(lpId: number, order: string) {
  return useMutation({
    mutationFn: (content: string) => createComment(lpId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, { lpId, order }],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error);
    },
  });
}

export default useCreateComment;
