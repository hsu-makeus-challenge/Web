import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

export const useLpUnlikeMutation = () => {
  return useMutation({
    mutationFn: async (lpId: number) => {
      const res = await AuthAPI.delete(`/lps/${lpId}/likes`);
      return res.data;
    },
  });
};
