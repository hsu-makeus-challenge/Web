import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';


interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  name: string;
  id: number;
  email: string | null;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const from = location.state?.from || '/';

  const handleLoginSuccess = async (data: any) => {
    try {
      console.log("[로그인] 로그인 성공, 응답:", data);
      const { accessToken, refreshToken, name, id, email } = data;

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // AuthContext 상태 업데이트
      login(accessToken, { id, name: name || '사용자', email });
      await queryClient.invalidateQueries();
      alert(`${name || '사용자'}님 환영합니다!`);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("[로그인] 로그인 후처리 중 오류:", error);
      alert("로그인은 성공했으나 일부 정보 처리에 실패했습니다.");
    }
  };

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await axiosInstance.post('/v1/auth/signin', data);
      return response.data.data; // 응답 구조에 맞게 수정
    },
    onSuccess: handleLoginSuccess,
    onError: (error) => {
      console.error("[로그인] 로그인 실패:", error);
      alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
    }
  });

  // 구글 로그인 버튼 클릭 시 호출되는 함수 정의
  const handleGoogleLogin = () => {
    const googleAuthUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/v1/auth/google/login`;
    window.location.href = googleAuthUrl;
  };

  // 구글 인증 코드가 URL에 있을 때 처리하는 함수
  const handleGoogleAuth = useCallback(async () => {
    const query = new URLSearchParams(location.search);
    let code = query.get("code");
    const error = query.get("error");

    if (error) {
      console.error("[로그인] 구글 로그인 실패:", error);
      alert("구글 로그인에 실패했습니다. 다시 시도해주세요.");
      navigate("/login");
      return;
    }

    if (code) {
      try {
        console.log("[로그인] 구글 인증 코드 수신:", code);
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await axiosInstance.get(`${baseURL}/v1/auth/google/callback?code=${code}`);
        // 응답 구조에 따라 토큰이 있는 쪽을 전달
        const loginData = response.data.data ?? response.data;
        await handleLoginSuccess(loginData);
      } catch (error) {
        console.error("[로그인] 구글 로그인 후처리 중 오류:", error);
        alert("구글 로그인 처리 중 오류가 발생했습니다.");
        navigate("/login");
      }
    }
  }, [location, navigate, handleLoginSuccess]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const name = params.get('name');
    const email = params.get('email');
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      login(accessToken, { id: 0, name: name || '사용자', email }); 
      queryClient.invalidateQueries();
      alert(`${name || '사용자'}님 환영합니다!`);
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">로그인</h2>
        
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          loginMutation.mutate({
            email: formData.get('email') as string,
            password: formData.get('password') as string
          });
        }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-blue-700 rounded-md text-white font-medium"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">또는</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 bg-white hover:bg-gray-100 rounded-md text-gray-800 font-medium flex items-center justify-center"
          >
            <img
              src="/google-icon.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google로 로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;