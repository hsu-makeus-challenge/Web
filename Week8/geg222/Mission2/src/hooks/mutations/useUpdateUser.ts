import { useMutation } from "@tanstack/react-query";
import { patchUser } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export const useUpdateUser = (setData: any, setIsEditing: any) =>
  useMutation({
    mutationFn: patchUser,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.user] });

      const previous = queryClient.getQueryData([QUERY_KEY.user]);

      queryClient.setQueryData([QUERY_KEY.user], (old: any) => ({
        ...old,
        data: {
          ...old.data,
          name: updated.name,
          bio: updated.bio,
          avatar: updated.avatar,
        },
      }));

      setData((prev: any) => (prev ? { ...prev, ...updated } : null));
      setIsEditing(false);

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY.user], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
    },
  });
