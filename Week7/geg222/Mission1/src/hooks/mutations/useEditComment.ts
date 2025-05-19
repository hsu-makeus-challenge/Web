

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { patchLpComment } from "../../apis/lp";
import { RequestUpdateCommentDto, ResponseUpdateCommentDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function useEditComment(
  lpId: number,
  order: "asc" | "desc",
  options?: UseMutationOptions<ResponseUpdateCommentDto, Error, { commentId: number; content: string }>
) {
  return useMutation({
    mutationFn: ({ commentId, content }) =>
      patchLpComment(lpId, commentId, { content }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, lpId, order],
        exact: true,
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY.comments, lpId, order],
        exact: true,
      });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    onMutate: (variables) => {
      options?.onMutate?.(variables);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}

export default useEditComment;