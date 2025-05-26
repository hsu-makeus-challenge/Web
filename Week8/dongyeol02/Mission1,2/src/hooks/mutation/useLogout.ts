import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      logout(); // 토큰 제거 및 context 초기화
      alert("로그아웃 성공");
      window.location.href = "/";
    },
    onError: () => {
      alert("로그아웃 실패");
    },
  });
};

export default useLogout;
