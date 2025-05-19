import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";
import type { LpUpdatePayload } from "../../types/lp";

export const useLpUpdateMutation = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: LpUpdatePayload }) => {
      const res = await AuthAPI.patch(`/lps/${id}`, payload);
      return res.data;
    },
  });
};
