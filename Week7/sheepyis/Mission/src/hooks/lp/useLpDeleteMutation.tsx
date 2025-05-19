import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

export const useLpDeleteMutation = () => {
  return useMutation({
    mutationFn: async (lpId: number) => {
      const response = await AuthAPI.delete(`/lps/${lpId}`);
      return response.data;
    },
  });
};
