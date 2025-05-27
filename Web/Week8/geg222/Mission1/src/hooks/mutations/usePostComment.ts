import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLpComment } from "../../apis/lp";

const usePostComment = (postId: number, onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postLpComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      onSuccessCallback?.();
    },
  });
};

export default usePostComment;
