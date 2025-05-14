import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";
import type { Login } from "../../types/login";

export const useAuthLoginMutation = () => {
  return useMutation({
    mutationFn: async (loginData: Login) => {
      const res = await AuthAPI.post("/auth/signin", loginData);
      console.log(res);
      return res.data;
    },
  });
};
