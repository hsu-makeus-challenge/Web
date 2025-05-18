import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";
import type { LpDetailItem } from "../../types/lp";

export const useLpLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lpId: number) => {
      const res = await AuthAPI.post(`/lps/${lpId}/likes`);
      return res.data;
    },
    onMutate: async (lpId: number) => {
      await queryClient.cancelQueries({ queryKey: ["lpDetail", lpId] });

      const previousData = queryClient.getQueryData<LpDetailItem>(["lpDetail", lpId]);

      const userId = Number(localStorage.getItem("userId"));

      if (previousData) {
        queryClient.setQueryData<LpDetailItem>(["lpDetail", lpId], {
          ...previousData,
          likes: [...previousData.likes, { id: Date.now(), userId, lpId }],
        });
      }

      return { previousData };
    },
    onError: (_err, lpId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["lpDetail", lpId], context.previousData);
      }
    },
    onSettled: (_data, _error, lpId) => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
  });
};
