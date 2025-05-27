// src/hooks/mutation/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { RequestSigninDto } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";

const useLogin = () => {
  const { login } = useAuth(); // 토큰 저장은 login()에 이미 구현돼 있음

  return useMutation({
    mutationFn: (signinData: RequestSigninDto) => login(signinData),
  });
};

export default useLogin;
