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
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });

      const previousUser = queryClient.getQueryData(["me"]);

      queryClient.setQueryData(["me"], (old: any) => ({
        ...old,
        data: {
          ...old.data,
          name: newData.name,
          bio: newData.bio,
          avatar: newData.avatar ?? old.data.avatar,
        },
      }));

      return { previousUser };
    },
    onError: (err, _, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["me"], context.previousUser);
      }
      alert("수정 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
