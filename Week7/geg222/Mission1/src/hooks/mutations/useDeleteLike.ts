import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    retry: 3,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
    onError: (error, variables, context) => {},
    onMutate: (variables) => {
      console.log("hi");
    },
    onSettled: (data, error, variables, context) => {},
  });
}

export default useDeleteLike;
