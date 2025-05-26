import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { axiosInstance } from "../../apis/axios";

export const useLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
} = {}) => {
  return useMutation<void, Error, void>({
    mutationFn: postLogout,
    onSuccess: () => {
      // 토큰 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // axios 헤더 초기화
      delete axiosInstance.defaults.headers.common.Authorization;

      window.location.replace("/login");

      // 외부 콜백 호출
      if (onSuccess) onSuccess();
    },
    onError,
  });
};
