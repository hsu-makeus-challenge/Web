import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";

const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: updateUserInfo,
    onMutate: async (newUserInfo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const previousUserInfo = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

      const newMyInfo = {
        ...previousUserInfo,
        data: {
          ...previousUserInfo?.data,
          name: newUserInfo.name,
          bio: newUserInfo.bio,
          avatar: newUserInfo.avatar,
        },
      };

      queryClient.setQueryData([QUERY_KEY.myInfo], newMyInfo);

      return { previousUserInfo };
    },
    onError: (error, newUserInfo, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousUserInfo);
      }
      alert("정보 수정 실패");
      console.error("정보 수정 중에 오류가 발생했습니다", error);
  },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
      alert("정보가 수정되었습니다.");
    },
  });
};

export default useUpdateUserInfo;
