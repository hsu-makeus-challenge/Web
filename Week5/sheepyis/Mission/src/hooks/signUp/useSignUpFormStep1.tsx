import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1Schema } from "../../utils/signUp/step1Schema";

export const useSignUpFormStep1 = () => {
  return useForm<Step1Schema>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
  });
};
