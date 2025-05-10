import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3Schema } from "../../utils/signUp/step3Schema";

export const useSignUpFormStep3 = () => {
  return useForm<Step3Schema>({
    resolver: zodResolver(step3Schema),
    mode: "onChange",
  });
};
