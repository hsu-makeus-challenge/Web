import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useCreateLp() {
  return useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
    onError: (error) => {
      console.error("LP 생성 실패", error);
    },
  });
}

export default useCreateLp;
