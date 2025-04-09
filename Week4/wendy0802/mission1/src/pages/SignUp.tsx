import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../components/Navbar";

// ✅ zod 스키마 정의
const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다!"),
});

const passwordSchema = z
  .object({
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다!",
    path: ["confirmPassword"],
  });

const nicknameSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요!"),
});

type EmailForm = z.infer<typeof emailSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type NicknameForm = z.infer<typeof nicknameSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailForm>({ resolver: zodResolver(emailSchema) });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: pwErrors },
  } = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) });

  const {
    register: registerNickname,
    handleSubmit: handleNicknameSubmit,
    formState: { errors: nicknameErrors },
  } = useForm<NicknameForm>({ resolver: zodResolver(nicknameSchema) });

  const onEmailValid = () => {
    setStep(2);
  };

  const onPasswordValid = () => {
    setStep(3);
  };

  const onComplete = () => {
    alert("회원가입 성공!");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm mb-6 flex items-center justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-xl font-bold text-blue-500"
          >
            {"<"}
          </button>
          <h1 className="text-2xl font-semibold mb-4 text-gray-500">
            회원가입
          </h1>
        </div>

        {/* STEP 1: 이메일 */}
        {step === 1 && (
          <form
            onSubmit={handleEmailSubmit(onEmailValid)}
            className="w-full max-w-sm space-y-4"
          >
            <button className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 bg-white text-gray-400">
              <img src="/google.png" alt="google" className="w-5 h-5" />
              <span>구글 로그인</span>
            </button>

            <div className="flex items-center justify-between text-gray-400">
              <hr className="w-1/3" />
              <span>OR</span>
              <hr className="w-1/3" />
            </div>

            <input
              type="text"
              placeholder="이메일을 입력해주세요!"
              {...registerEmail("email")}
              className={`w-full px-4 py-2 border rounded bg-white text-black ${
                emailErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {emailErrors.email && (
              <p className="text-red-500 text-sm ml-1">
                {emailErrors.email.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:opacity-80 transition"
            >
              다음
            </button>
          </form>
        )}

        {/* STEP 2: 비밀번호 */}
        {step === 2 && (
          <form
            onSubmit={handlePasswordSubmit(onPasswordValid)}
            className="w-full max-w-sm space-y-4"
          >
            {/* 비밀번호 */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요!"
                {...registerPassword("password")}
                className={`w-full px-4 py-2 border rounded bg-white text-black pr-10 ${
                  pwErrors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <img
                  src={showPassword ? "/eye_1.png" : "/eye_2.png"}
                  alt="비밀번호 보기"
                  className="w-5 h-5"
                />
              </button>
              {pwErrors.password && (
                <p className="text-red-500 text-sm ml-1">
                  {pwErrors.password.message}
                </p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해 주세요!"
                {...registerPassword("confirmPassword")}
                className={`w-full px-4 py-2 border rounded bg-white text-black pr-10 ${
                  pwErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <img
                  src={showConfirmPassword ? "/eye_1.png" : "/eye_2.png"}
                  alt="비밀번호 확인 보기"
                  className="w-5 h-5"
                />
              </button>
              {pwErrors.confirmPassword && (
                <p className="text-red-500 text-sm ml-1">
                  {pwErrors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:opacity-80 transition"
            >
              다음
            </button>
          </form>
        )}

        {/* STEP 3: 닉네임 */}
        {step === 3 && (
          <form
            onSubmit={handleNicknameSubmit(onComplete)}
            className="w-full max-w-sm space-y-4 flex flex-col items-center"
          >
            <img
              src="/default_profile.png"
              alt="기본 프로필"
              className="w-24 h-24 rounded-full bg-gray-300"
            />
            <input
              type="text"
              placeholder="닉네임을 입력해 주세요!"
              {...registerNickname("nickname")}
              className={`w-full px-4 py-2 border rounded bg-white text-black ${
                nicknameErrors.nickname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {nicknameErrors.nickname && (
              <p className="text-red-500 text-sm ml-1">
                {nicknameErrors.nickname.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 rounded hover:opacity-80 transition"
            >
              가입 완료
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default SignUp;
