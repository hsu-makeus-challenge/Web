import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { updateComment } from "../../apis/comments";

type UpdateCommentPayload = {
  commentId: number;
  content: string;
};

const useUpdateComment = (lpId: string) => {
  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentPayload) =>
      updateComment(lpId, commentId, content),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });
};

export default useUpdateComment;
