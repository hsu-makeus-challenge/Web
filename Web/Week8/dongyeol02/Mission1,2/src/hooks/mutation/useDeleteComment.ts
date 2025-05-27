import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comments";
import { queryClient } from "../../App";

const useDeleteComment = (lpId: string) => {
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });
};

export default useDeleteComment;
