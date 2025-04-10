import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { postSignup } from "../apis/auth";
import ArrowButton from "../components/ArrowButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeToggleIcon from "../components/EyeToggleIcon";

const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
      message: "비밀번호는 20자 이하여야 합니다.",
    }),
  passwordCheck: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
      message: "비밀번호는 20자 이하여야 합니다.",
    }),
  name: 
  z.
    string().
    min(1, { message: "이름을 입력해주세요." }),
})
.refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path:['passwordCheck'],
});

type FromFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FromFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FromFields> = async(data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);

    console.log(response);
    navigate('/login');
  };

  return (
    <div className='bg-white text-black min-h-screen flex flex-col items-center justify-center px-4 py-10'>
      <div className='w-full max-w-sm sm:max-w-md'>
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-xl font-bold">회원가입</h1>
          <div className="absolute left-0">
            <ArrowButton
              direction="prev"
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else navigate(-1);
              }}
              label="이전"
            />
          </div>
        </div>
        {step === 1 && (
          <div className='flex flex-col gap-3'>
            <input 
              {...register("email")}
              className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm focus:outline-none
              ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type={"email"}
              placeholder={'이메일'}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}

            <button 
              type='button' 
              onClick={() => setStep(2)}
              disabled={!!errors.email || !getValues("email")}
              className={`w-full py-2 rounded font-semibold transition ${
                !errors.email && getValues("email")
                  ? 'bg-[#80ed99] text-white hover:bg-[#72d389] cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <div className='flex flex-col gap-3'>
            <p className="text-sm mb-2 flex items-center gap-2">
              <span>📧</span>
              {getValues("email")}
            </p>
            <div className="relative">
              <input 
                {...register("password")}
                className={`border w-full p-[10px] pr-10 rounded-sm focus:outline-none
                ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={showPassword ? "text" : "password"}
                placeholder={'비밀번호'}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeToggleIcon visible={showPassword} />
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message}</div>
            )}

            <div className="relative">
              <input 
                {...register("passwordCheck")}
                className={`border w-full p-[10px] pr-10 rounded-sm focus:outline-none
                ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={showPasswordCheck ? "text" : "password"}
                placeholder={'비밀번호 확인'}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
              >
                <EyeToggleIcon visible={showPasswordCheck} />
              </button>
            </div>
            {errors.passwordCheck && (
              <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
            )}

              <button 
                type='button' 
                onClick={() => setStep(3)}
                disabled={!!errors.password || !!errors.passwordCheck || !getValues("password") || !getValues("passwordCheck")}
                className={`w-full py-2 px-4 rounded font-semibold transition ${
                  !errors.password && !errors.passwordCheck && getValues("password") && getValues("passwordCheck")
                    ? 'bg-[#80ed99] text-white hover:bg-[#72d389] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                다음
              </button>
          </div>
        )}

        {step === 3 && (
          <div className='flex flex-col gap-3'>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <input 
              {...register("name")}
              className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm focus:outline-none
              ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type={"text"}
              placeholder={'이름'}
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}

            <button 
              type='button' 
              onClick={handleSubmit(onSubmit)} 
              disabled={!!errors.name || !getValues("name") || isSubmitting} 
              className={`w-full py-2 px-4 rounded font-semibold transition ${
                !errors.name && getValues("name") && !isSubmitting
                  ? 'bg-[#80ed99] text-white hover:bg-[#72d389] cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;