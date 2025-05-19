import { useMutation } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { UpdateLpRequest } from "../../types/lp";
import { queryClient } from "../../App";

const useEditLp = (lpId: number) => {
  return useMutation({
    mutationFn: (body: UpdateLpRequest) => updateLp(lpId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpId],
        exact: true,
      });
    },
    onError: () => {
      alert("LP 정보 수정에 실패했습니다.");
    },
  });
};

export default useEditLp;