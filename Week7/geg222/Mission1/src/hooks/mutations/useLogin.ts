import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { RequestSigninDto, ResponseSigninDto } from "../../types/auth";

function useLogin(
  options?: UseMutationOptions<ResponseSigninDto, Error, RequestSigninDto>
) {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: (data, variables, context) => {
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

export default useLogin;
