import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";

function useDeleteLp() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (lpId: number) => deleteLp(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
        exact: true,
      });
      alert("LP가 삭제되었습니다.");
      navigate("/");
    },
    onError: () => {
      alert("LP 삭제에 실패했습니다.");
    },
  });
}

export default useDeleteLp;