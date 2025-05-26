import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comments";
import { ResponseCommentDto, RequestCommentDto } from "../../types/comment";

const usePostComment = (lpId: string) => {
  const queryClient = useQueryClient();
  return useMutation<ResponseCommentDto, Error, RequestCommentDto>({
    mutationFn: (newComment) => postComment({ lpId, ...newComment }),
    onSuccess: () => {
      // 댓글 쓰고 나서 리스트 새로고침!!!
      queryClient.invalidateQueries({
        queryKey: ["comments", lpId],
      });
    },
  });
};

export default usePostComment;
