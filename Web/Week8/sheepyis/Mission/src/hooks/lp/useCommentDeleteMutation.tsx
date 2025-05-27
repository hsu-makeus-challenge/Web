import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

export const useCommentDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, commentId }: { lpId: number; commentId: number }) => {
      return await AuthAPI.delete(`/lps/${lpId}/comments/${commentId}`);
    },
    onSuccess: (_, { lpId }) => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
      alert("댓글이 삭제되었습니다.");
    },
  });
};
