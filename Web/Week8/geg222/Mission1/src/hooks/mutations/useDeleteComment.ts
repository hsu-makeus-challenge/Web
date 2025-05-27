import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { deleteLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function useDeleteComment(
  lpId: number,
  order: "asc" | "desc",
  options?: UseMutationOptions<void, Error, number>
) {
  return useMutation({
    mutationFn: (commentId: number) => deleteLpComment(lpId, commentId),
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

export default useDeleteComment;
