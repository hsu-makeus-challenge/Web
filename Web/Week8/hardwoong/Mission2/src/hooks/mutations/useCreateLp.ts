import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { toast } from "react-toastify";
function useCreateLp() {
  return useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
      toast.success("LP가 성공적으로 생성되었습니다!");
    },
    onError: (error) => {
      console.error("LP 생성 실패", error);
      toast.error("LP 생성에 실패했습니다. 다시 시도해 주세요.");
    },
  });
}

export default useCreateLp;
