import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp.ts";
import { queryClient } from "../../App.tsx";
import { QUERY_KEY } from "../../constants/key.ts";
import { ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    onMutate: async (lp) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, String(lp.lpId)],
      });

      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        String(lp.lpId),
      ]);

      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);

      if (!previousLpPost || !userId) return;

      const newLpPost = { ...previousLpPost };
      newLpPost.data.likes.push({ userId });
      queryClient.setQueryData([QUERY_KEY.lps, String(lp.lpId)], newLpPost);

      return { previousLpPost };
    },

    onError: (_err, lp, context) => {
      if (context?.previousLpPost) {
        queryClient.setQueryData(
          [QUERY_KEY.lps, String(lp.lpId)],
          context.previousLpPost
        );
      }
    },

    onSettled: (_data, _err, lp) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, String(lp.lpId)],
      });
    },
  });
}

export default usePostLike;