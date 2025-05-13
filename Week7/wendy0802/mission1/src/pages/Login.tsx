import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "../api/auth";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getMyInfo } from "../api/auth";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken, setRefreshToken } = useAuth();

  // 구글 인증 후 리다이렉트 시 토큰 저장
  const handleGoogleAuth = useCallback(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const email = query.get("email");
    const name = query.get("name");
    const error = query.get("error");

    if (error) {
      alert("구글 로그인에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    if (accessToken && refreshToken) {
      console.log("[로그인] 구글 로그인 성공, 토큰 저장:", { 
        accessToken: accessToken ? "있음" : "없음", 
        refreshToken: refreshToken ? "있음" : "없음",
        email, name
      });
      
      // 사용자 정보 로컬 스토리지에 저장
      localStorage.setItem("signup_email", email || "");
      localStorage.setItem("signup_nickname", name || "");
      
      // localStorage에 토큰 직접 저장 (혹시 모르니 2중 저장)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      
      // AuthContext 상태 업데이트
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 저장 후 토큰 확인
      setTimeout(() => {
        const storedToken = localStorage.getItem("accessToken");
        console.log("[로그인] 로컬스토리지 토큰 확인:", storedToken ? "있음" : "없음");
      }, 100);

      alert(`${name}님 환영합니다!`);
      navigate("/my");
    }
  }, [location, navigate, setAccessToken, setRefreshToken]);

  useEffect(() => {
    handleGoogleAuth();
  }, [handleGoogleAuth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // 구글 로그인 버튼 클릭 시에만 리다이렉트
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;
    window.location.href = apiUrl + "/v1/auth/google/login";
  };

  const onValid = async (data: LoginForm) => {
    try {
      console.log("[로그인] 로그인 시도:", data.email);
      
      // 로그인 API 호출
      const res = await loginApi(data);
      console.log("[로그인] API 응답:", res);
      
      const { accessToken, refreshToken } = res.data;
      console.log("[로그인] 토큰 받음:", { 
        accessToken: accessToken ? "있음" : "없음", 
        refreshToken: refreshToken ? "있음" : "없음" 
      });

      // localStorage에 토큰 직접 저장 (혹시 모르니 2중 저장)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      
      // AuthContext 상태 업데이트
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 저장 후 토큰 확인
      setTimeout(() => {
        const storedToken = localStorage.getItem("accessToken");
        console.log("[로그인] 로컬스토리지 토큰 확인:", storedToken ? "있음" : "없음");
      }, 100);

      // 사용자 정보 가져오기
      try {
        console.log("[로그인] 사용자 정보 요청");
        const userInfo = await getMyInfo();
        const userName = userInfo.data.name || "사용자";
        console.log("[로그인] 사용자 정보 받음:", userName);
        
        // 사용자 정보만 로컬 스토리지에 저장
        localStorage.setItem("signup_email", data.email);
        localStorage.setItem("signup_password", data.password);
        localStorage.setItem("signup_nickname", userName);
        localStorage.setItem("signup_step", "1");

        alert(`${userName}님 환영합니다!`);
      } catch (err) {
        console.error("[로그인] 사용자 정보를 가져오는데 실패했습니다:", err);
        alert("로그인에 성공했습니다!");
      }
      
      navigate("/my");
    } catch (err) {
      console.error("[로그인] 로그인 실패:", err);
      alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm mb-6 flex items-center justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-xl font-bold text-blue-500"
          >
            {"<"}
          </button>
          <h1 className="text-xl font-semibold text-center w-full text-gray-500">
            로그인
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onValid)}
          className="w-full max-w-sm space-y-4 text-green-500"
        >
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

          <input
            type="text"
            placeholder="이메일을 입력해주세요!"
            {...register("email")}
            autoComplete="email"
            className={`w-full px-4 py-2 border rounded bg-white text-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm ml-1">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            {...register("password")}
            autoComplete="current-password"
            className={`w-full px-4 py-2 border rounded bg-white text-black ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm ml-1">
              {errors.password.message}
            </p>
          )}

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