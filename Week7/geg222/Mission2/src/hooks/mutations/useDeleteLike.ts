import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
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
      const likedIndex = previousLpPost.data.likes.findIndex(
        (like) => like.userId === userId
      );

      if (likedIndex !== undefined && likedIndex >= 0) {
        newLpPost.data.likes.splice(likedIndex, 1);
        queryClient.setQueryData([QUERY_KEY.lps, String(lp.lpId)], newLpPost);
      }

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

export default useDeleteLike;
