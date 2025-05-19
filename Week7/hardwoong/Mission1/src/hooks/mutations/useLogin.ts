import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { RequestSigninDto, ResponseSigninDto } from "../../types/auth";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import { useAuth } from "../../context/AuthContext";

const useLogin = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  return useMutation<ResponseSigninDto, Error, RequestSigninDto>({
    mutationFn: postSignin,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.data.refreshToken));

      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
    },
    onError: (error) => {
      alert("로그인에 실패했습니다.");
      console.error("로그인 실패:", error);
    },
  });
};

export default useLogin;