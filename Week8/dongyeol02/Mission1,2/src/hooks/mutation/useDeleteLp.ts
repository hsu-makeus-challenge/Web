import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";

const useDeleteLp = (options = {}) => {
  return useMutation({
    mutationFn: (lpId: number) => deleteLp(lpId),
    ...options,
  });
};

export default useDeleteLp;
