import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../components/Navbar";
import { loginApi } from "../api/auth";

// 로그인 스키마 정의
const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type LoginForm = z.infer<typeof loginSchema>;


const GOOGLE_CLIENT_ID = "619255354847-s43k4unricgtq8kg89p07levf6ifi5kc.apps.googleusercontent.com";


const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // 구글 로그인 핸들러
  const handleGoogleLogin = () => {
    // 서버에서 OAuth 리다이렉트 처리
    window.location.href = `${SERVER_API_URL}/v1/auth/google/login`;
    navigate("/my");
    // 만약 프론트엔드에서 직접 구글 OAuth를 시작하고 싶다면 아래 주석 해제
    /*
    const redirectUri = encodeURIComponent(`${SERVER_API_URL}/v1/auth/google/callback`);
    const scope = encodeURIComponent("openid profile email");
    const responseType = "code";
    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=${responseType}` +
      `&scope=${scope}`;
    window.location.href = googleAuthUrl;
    */
  };

  // 일반 로그인 핸들러
  const onValid = async (data: LoginForm) => {
    try {
      const res = await loginApi(data);
      const { name, accessToken } = res.data.data;
      alert(`${name}님 환영합니다!`);
      localStorage.setItem("accessToken", accessToken);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm mb-6 flex items-center justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-xl font-bold text-blue-500"
          >
            {"<"}
          </button>
          <h1 className="text-xl font-semibold text-center w-full text-gray-500">로그인</h1>
        </div>

        {/* 구글 로그인 버튼 */}
        <form onSubmit={handleSubmit(onValid)} className="w-full max-w-sm space-y-4 text-blue-500">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 text-gray-500"
          >
            <img src="./google.png" alt="google" className="w-5 h-5" />
            <span>구글 로그인</span>
          </button>

          <div className="flex items-center justify-between text-gray-500">
            <hr className="w-1/3" />
            <span>OR</span>
            <hr className="w-1/3" />
          </div>

          {/* 이메일 입력 폼 */}
          <input
            type="text"
            placeholder="이메일을 입력해주세요!"
            {...register("email")}
            className={`w-full px-4 py-2 border rounded bg-white text-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm ml-1">{errors.email.message}</p>}

          {/* 비밀번호 입력 폼 */}
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            {...register("password")}
            className={`w-full px-4 py-2 border rounded bg-white text-black ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm ml-1">{errors.password.message}</p>}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:opacity-80 transition"
          >
            로그인
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
