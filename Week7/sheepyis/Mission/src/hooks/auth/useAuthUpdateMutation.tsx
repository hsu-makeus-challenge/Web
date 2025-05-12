import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

type UpdateUserDto = {
  name: string;
  bio?: string;
  avatar?: string;
};

export const useAuthUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const res = await AuthAPI.patch("/users", data);
      return res.data;
    },
    onSuccess: () => {
      alert("프로필이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err) => {
      console.error("프로필 수정 실패:", err);
      alert("수정에 실패했습니다.");
    },
  });
};
