import { z } from "zod";
// @ts-ignore
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { postSignup as apiPostSignup } from "../apis/auth";
import SignupForm from "../components/SignupForm";

const schema = z
  .object({
    email: z
      .string()
      .email({
        message:
          "잘못된 이메일 주소입니다. example@email.com 형식으로 입력되었는지 확인하세요.",
      }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

export const SignupPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");

  const handleNextStep = async () => {
    const valid = await trigger(
      step === 1 ? "email" : step === 2 ? ["password", "passwordCheck"] : "name"
    );
    if (valid && (step !== 2 || password === passwordCheck)) {
      setStep(step + 1);
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    const response = await apiPostSignup(rest);
    console.log(response);
    navigate("/login");
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (step === 1 && email && !errors.email) {
          handleNextStep();
        } else if (
          step === 2 &&
          password &&
          passwordCheck &&
          !errors.password &&
          !errors.passwordCheck &&
          password === passwordCheck
        ) {
          handleNextStep();
        }
      }
    },
    [step, email, password, passwordCheck, errors]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <FormProvider
          {...{
            register,
            handleSubmit,
            formState: { errors },
            watch,
            trigger,
          }}
        >
          <SignupForm
            step={step}
            setStep={setStep}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showPasswordCheck={showPasswordCheck}
            setShowPasswordCheck={setShowPasswordCheck}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            handleNextStep={handleNextStep}
            onSubmit={onSubmit}
          />
        </FormProvider>
      </div>
    </div>
  );
};

export default SignupPage;
