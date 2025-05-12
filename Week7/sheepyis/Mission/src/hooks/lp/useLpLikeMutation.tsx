import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

export const useLpLikeMutation = () => {
  return useMutation({
    mutationFn: async (lpId: number) => {
      const res = await AuthAPI.post(`/lps/${lpId}/likes`);
      return res.data;
    },
  });
};
