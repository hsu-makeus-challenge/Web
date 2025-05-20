import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { Likes, RequestLpDto, ResponseLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    //onMutate ->API 요청 이전에 호출 되는 친구
    onMutate: async (lp: RequestLpDto) => {
      //1.게시글에 관련된 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      //게시글  데이터 복사해서 newLpPost 새로운 객체 만들기
      //복사하는 이유 -> 오루닜을꺠 이전 상태로 되돌리기

      const NewLpPost = { ...previousLpPost };
      //좋아요 눌렀던 위치를 찾아야함
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);
      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1;
      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      //업데이트된 게시글 데이터를 캐시에 저장
      //UI가 바로 업데이트 -> 사용자가 바로 변화를 확인 가능
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], NewLpPost);
      return { previousLpPost, NewLpPost };
    },
    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY, newLp.lpId],
        context?.previousLpPost?.data.id
      );
    },

    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}
export default useDeleteLike;
