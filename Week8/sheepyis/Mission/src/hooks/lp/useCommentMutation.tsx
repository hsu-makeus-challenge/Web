import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

type CreateCommentDto = {
  lpId: number;
  content: string;
};

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, content }: CreateCommentDto) => {
      const res = await AuthAPI.post(`/lps/${lpId}/comments`, {
        content,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
        alert("댓글이 등록되었습니다.");
        // console.log("댓글 데이터:", data);

        queryClient.refetchQueries({
            queryKey: ["lpComments", variables.lpId],
        });
    },
    onError: (err) => {
      console.error("댓글 등록 실패:", err);
    },
  });
};
