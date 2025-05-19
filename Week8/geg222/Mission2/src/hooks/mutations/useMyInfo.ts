import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { patchUser } from "../../apis/auth";
import { RequestUpdateUserDto, ResponseUpdateUserDto } from "../../types/auth";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function usePatchUser(
  options?: UseMutationOptions<
    ResponseUpdateUserDto,
    Error,
    RequestUpdateUserDto
  >
) {
  return useMutation({
    mutationFn: patchUser,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.user],
        exact: true,
      });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    onMutate: (variables) => {
      options?.onMutate?.(variables);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}

export default usePatchUser;
