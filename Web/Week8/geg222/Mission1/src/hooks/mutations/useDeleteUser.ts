

import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/auth";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // 탈퇴 성공 후 로직 예: 토큰 삭제, 이동 등
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login"; // 로그인 페이지로 이동
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
    },
  });
};