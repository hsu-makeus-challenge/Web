import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, passwordSchema, nicknameSchema, EmailFormData, PasswordFormData, NicknameFormData, } from "../schema/signupschema";
import { useLocalStorage } from "./uselocalstorage";

export const useSignupForm = () => {
  const [emailValue, setEmailValue] = useLocalStorage("signup-email", "");
  const [nicknameValue, setNicknameValue] = useLocalStorage("signup-nickname", "");

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isValid: isEmailValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: pwErrors, isValid: isPasswordValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const {
    register: registerNickname,
    handleSubmit: handleNicknameSubmit,
    formState: { errors: nicknameErrors, isValid: isNicknameValid },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    mode: "onChange",
  });

  const resetStorage = () => {
    setEmailValue("");
    setNicknameValue("");
  };

  return {
    emailValue,
    nicknameValue,
    registerEmail,
    handleEmailSubmit,
    emailErrors,
    isEmailValid,
    registerPassword,
    handlePasswordSubmit,
    pwErrors,
    isPasswordValid,
    watch,
    registerNickname,
    handleNicknameSubmit,
    nicknameErrors,
    isNicknameValid,
    resetStorage,
    setEmailValue,
  };
};
