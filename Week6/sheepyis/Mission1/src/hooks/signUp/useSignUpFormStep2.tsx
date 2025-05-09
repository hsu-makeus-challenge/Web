import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../../utils/signUp/step2Schema";
import type { Step2Schema } from "../../utils/signUp/step2Schema";

export const useSignUpFormStep2 = () => {
  return useForm<Step2Schema>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
  });
};
