import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

export const useCommentUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lpId,
      commentId,
      content,
    }: { lpId: number; commentId: number; content: string }) => {
      return await AuthAPI.patch(`/lps/${lpId}/comments/${commentId}`, { content });
    },
    onSuccess: (_, { lpId }) => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });
};
