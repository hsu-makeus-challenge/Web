import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
      alert("정보가 수정되었습니다.");
    },
    onError: (error) => {
      alert("정보 수정 실패");
      console.error("정보 수정 중에 오류가 발생했습니다", error);
    }
  });
};

export default useUpdateUserInfo;
