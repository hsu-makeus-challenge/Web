import { useMutation } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";

const useUpdateLp = (lpId: number, options = {}) => {
  return useMutation({
    mutationFn: (data: {
      title: string;
      content: string;
      thumbnail: string;
      tags: string[];
      published: boolean;
    }) => updateLp(lpId, data),
    ...options,
  });
};

export default useUpdateLp;
