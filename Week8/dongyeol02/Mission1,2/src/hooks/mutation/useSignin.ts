import { useMutation } from "@tanstack/react-query";
import { signin } from "../../apis/auth";
import { RequestSigninDto, ResponseSigninDto } from "../../types/auth";

const useSignin = () => {
  return useMutation<ResponseSigninDto, Error, RequestSigninDto>({
    mutationFn: (loginInfo) => signin(loginInfo),
  });
};

export default useSignin;
