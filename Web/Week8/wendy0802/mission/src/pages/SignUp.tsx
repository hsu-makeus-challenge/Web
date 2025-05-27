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
import { signupApi } from "../api/auth";
import { z } from "zod";
import { postSignin } from "../api/auth";
const SignUp = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useForm<EmailForm>(emailSchema);
  const passwordForm = useForm<PasswordForm>(passwordSchema);
  const nicknameForm = useForm<NicknameForm>(nicknameSchema);

  const onEmailValid = (data: EmailForm) => {
    setEmailState(data.email);
    setStep(2);
  };

  const onPasswordValid = (data: PasswordForm) => {
    setPasswordState(data.password);
    setStep(3);
  };

  // 회원가입 후 자동 로그인까지 처리하는 함수
  const onSignupComplete = async (signupBody: any) => {
    try {
      // 회원가입 요청
      await signupApi(signupBody);

      // 회원가입 성공 후 바로 로그인 요청
      const signinBody = {
        email: signupBody.email,
        password: signupBody.password,
      };
      const signinResponse = await postSignin(signinBody);


      if (signinResponse && signinResponse.data.accessToken) {
        localStorage.setItem('accessToken', signinResponse.data.accessToken);
        // 닉네임도 저장
        localStorage.setItem('signup_nickname', signupBody.name);
      }
      alert("회원가입 및 로그인 성공!");
      navigate("/"); // 메인 페이지로 이동 등
    } catch (error) {
      console.error(error);
      alert("회원가입 또는 로그인 실패! 다시 시도해 주세요.");
    }
  };

  const onNicknameValid = async (data: NicknameForm) => {
    const avatarUrl = "https://avatars.githubusercontent.com/u/55682610?v=4";
    const bioText = "안녕하세요. 저는 " + data.nickname + "입니다.";
    const signupBody = {
      name: data.nickname,
      email: emailState,
      password: passwordState,
      bio: bioText,
      avatar: avatarUrl,
    };
    await onSignupComplete(signupBody);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative">

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
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              다음
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={nicknameForm.handleSubmit(onNicknameValid)} className="w-full max-w-sm space-y-4 flex flex-col items-center">
            <img
              src="https://avatars.githubusercontent.com/u/55682610?v=4"
              alt="기본 프로필"
              className="w-24 h-24 rounded-full bg-gray-300"
            />
            <input
              type="text"
              placeholder="닉네임을 입력해주세요!"
              {...nicknameForm.register("nickname")}
              className={`w-full px-4 py-2 border rounded bg-white text-black ${
                nicknameForm.formState.errors.nickname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {nicknameForm.formState.errors.nickname && (
              <p className="text-red-500 text-sm ml-1">
                {nicknameForm.formState.errors.nickname.message}
              </p>
            )}
            <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded">
              가입 완료
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default SignUp;