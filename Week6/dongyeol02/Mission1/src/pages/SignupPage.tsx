import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import useAppNavigate from "../hooks/useAppNavigate";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z.string().min(8, "비밀번호는 8자 이상"),
    passwordCheck: z.string().min(8, "비밀번호 확인은 8자 이상"),
    name: z.string().min(1, "이름을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
  });

  const onSubmit = async (data: FormFields) => {
    const { passwordCheck, ...rest } = data;
    await postSignup(rest);
    alert("회원가입 성공!");
  };
  const navigate = useAppNavigate();

  const handleNext1 = async () => {
    const isEmailValid = await trigger("email");
    if (isEmailValid) {
      setStep(2);
    }
  };
  const handleNext2 = async () => {
    const isEmailValid = await trigger(["password", "passwordCheck"]);
    if (isEmailValid) {
      setStep(3);
    }
  };

  const handleGoogleLogin = () => {
    navigate("/googlelogin");
  };

  const handleHomePage = () => {
    navigate("/");
  };

  const backStep = () => {
    setStep((prev) => prev - 1);
  };

  const watchedEmail = watch("email");
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-[300px] relative h-[40px] flex items-center justify-center">
        <button
          className="absolute left-0 text-xl cursor-pointer"
          onClick={backStep}
        >
          &lt;
        </button>
        <span className="text-xl font-semibold">회원가입</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {step === 1 && (
          <>
            <input
              {...register("email")}
              type="email"
              placeholder="이메일"
              className="border p-2 w-[300px]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              type="button"
              onClick={handleNext1}
              className="bg-blue-600 text-white py-2 rounded"
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>email: {watchedEmail}</div>
            <div className="relative w-[300px]">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                className="border p-2 w-full pr-10" // ← 오른쪽 여백 확보!
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? "🙈" : "👀"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="relative w-[300px]">
              <input
                {...register("passwordCheck")}
                type={showPasswordCheck ? "text" : "password"}
                placeholder="비밀번호 확인"
                className="border p-2 w-[300px] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCheck((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPasswordCheck ? "🙈" : "👀"}
              </button>
            </div>
            {errors.passwordCheck && (
              <p className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </p>
            )}

            <button
              type="button"
              onClick={handleNext2}
              className="bg-blue-600 text-white py-2 rounded"
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 text-2xl">
              {" "}
            </div>
            <input
              {...register("name")}
              type="text"
              placeholder="이름"
              className="border p-2 w-[300px]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded"
            >
              회원가입 완료
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
