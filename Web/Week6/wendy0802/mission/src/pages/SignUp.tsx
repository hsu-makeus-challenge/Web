import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "../hooks/useForm";
import {
  emailSchema,
  passwordSchema,
  nicknameSchema,
  EmailForm,
  PasswordForm,
  NicknameForm
} from "../validation/signupSchema";
import { postSignup } from "../api/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [emailState, setEmailState] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailForm = useForm<EmailForm>(emailSchema);
  const passwordForm = useForm<PasswordForm>(passwordSchema);

  const onEmailValid = (data: EmailForm) => {
    setEmailState(data.email);
    setStep(2);
  };

  const onPasswordValid = async (data: PasswordForm) => {
    try {
      await postSignup({
        email: emailState,
        password: data.password,
        name: "",
        bio: "",
        avatar: ""
      });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패! 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative">

        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 text-xl font-bold text-blue-500"
        >
          {"<"}
        </button>

        <h1 className="text-xl font-semibold text-center w-full text-gray-500 mb-6">회원가입</h1>

        {/* 구글 로그인 버튼 */}
        <button className="w-full max-w-sm border border-gray-300 py-2 rounded flex items-center justify-center gap-2 text-gray-500 mb-6">
          <img
            src="./google.png"
            alt="google"
            className="w-5 h-5"
          />
          <span>구글 로그인</span>
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={emailForm.handleSubmit(onEmailValid)} className="w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="이메일을 입력해주세요!"
              {...emailForm.register("email")}
              className={`w-full px-4 py-2 border rounded bg-white text-black ${
                emailForm.formState.errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {emailForm.formState.errors.email && (
              <p className="text-red-500 text-sm ml-1">
                {emailForm.formState.errors.email.message}
              </p>
            )}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              다음
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={passwordForm.handleSubmit(onPasswordValid)} className="w-full max-w-sm space-y-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              {...passwordForm.register("password")}
              className={`w-full px-4 py-2 border rounded bg-white text-black ${
                passwordForm.formState.errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {passwordForm.formState.errors.password && (
              <p className="text-red-500 text-sm ml-1">
                {passwordForm.formState.errors.password.message}
              </p>
            )}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              회원가입
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default SignUp;
