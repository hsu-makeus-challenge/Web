import { UserSigninInformation } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

interface LoginFormProps {
  getInputProps: (field: keyof UserSigninInformation) => any;
  errors: Partial<Record<keyof UserSigninInformation, string>>;
  touched: Partial<Record<keyof UserSigninInformation, boolean>>;
  isDisabled: boolean;
  onSubmit: () => void;
  showPassword: boolean;
}

const LoginForm = ({
  getInputProps,
  errors,
  touched,
  isDisabled,
  onSubmit,
  showPassword,
}: LoginFormProps) => {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-[450px] px-8 py-10 bg-[#121212] rounded-lg text-white flex flex-col gap-6">
        {/* 로고와 제목 */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <img
            src="/public/spotify_icon.png"
            alt="Spotify"
            className="w-12 h-12"
          />
          <h1 className="text-4xl font-bold">Junpotify에 로그인하기</h1>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <GoogleLoginButton onClick={handleGoogleLogin}>
          Google로 계속하기
        </GoogleLoginButton>

        {/* 구분선 */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-[1px] bg-[#292929]" />
          <span className="text-sm text-[#A7A7A7]">
            이메일 또는 사용자 이름
          </span>
          <div className="flex-1 h-[1px] bg-[#292929]" />
        </div>

        {/* 로그인 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <input
              {...getInputProps("email")}
              placeholder="이메일 또는 사용자 이름"
              className="w-full px-3 py-3 bg-[#121212] border border-[#727272] rounded text-white placeholder-[#A7A7A7] focus:border-white transition-colors"
            />
            {errors?.email && touched?.email && (
              <div className="text-[#F15E6C] text-sm">{errors.email}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              {...getInputProps("password")}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className="w-full px-3 py-3 bg-[#121212] border border-[#727272] rounded text-white placeholder-[#A7A7A7] focus:border-white transition-colors"
            />
            {errors?.password && touched?.password && (
              <div className="text-[#F15E6C] text-sm">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-3 mt-4 rounded-full font-semibold text-black bg-[#1ED760] hover:bg-[#1FDF64] transition-colors ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            계속하기
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div className="text-center mt-4">
          <span className="text-[#A7A7A7]">계정이 없나요? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-white hover:underline font-semibold"
          >
            Junpotify에 가입하기
          </button>
        </div>
      </div>

      {/* reCAPTCHA 알림 */}
      <div className="text-[#A7A7A7] text-xs mt-8 text-center">
        이 사이트는 reCAPTCHA로 보호되며, Google 개인정보처리방침과 서비스
        약관이 적용됩니다.
      </div>
    </div>
  );
};

export default LoginForm;
