

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteLp } from "../../apis/lp";

const useDeleteCard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
      alert("삭제 중 문제가 발생했습니다.");
    },
  });
};

export default useDeleteCard;