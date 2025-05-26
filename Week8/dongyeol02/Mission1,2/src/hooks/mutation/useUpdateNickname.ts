import { useMutation } from "@tanstack/react-query";
import { updateNicknameFn } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";

function useUpdateNickname() {
  return useMutation({
    mutationFn: updateNicknameFn,
    onMutate: async (nickname: string) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });
      //이전데이터 복사
      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      let newMyInfo = null;

      if (previousMyInfo) {
        newMyInfo = {
          ...previousMyInfo,
          data: {
            ...previousMyInfo.data,
            name: nickname,
          },
        };

        queryClient.setQueryData([QUERY_KEY.myInfo], newMyInfo);
      }
      return { previousMyInfo };
    },
    onError: (error, nickname, context) => {
      if (context?.previousMyInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyInfo);
      }
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useUpdateNickname;
