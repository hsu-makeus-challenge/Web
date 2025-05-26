import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import { RequestCreateLpDto, ResponseCreateLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

const usePostLp = () => {
  return useMutation<ResponseCreateLpDto, Error, RequestCreateLpDto>({
    mutationFn: postLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
};

export default usePostLp;
