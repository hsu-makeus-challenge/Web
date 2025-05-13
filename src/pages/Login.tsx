import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResponse, LoginResponse } from '../types/api';

interface LoginForm {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string | null;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  // 사용자 정보 저장 함수
  const saveUserInfo = (name: string, email: string | null, id: string) => {
    if (email) localStorage.setItem('signup_email', email);
    localStorage.setItem('signup_nickname', name || '사용자');
    localStorage.setItem('userId', id);
  };

  const loginMutation = useMutation<ApiResponse<LoginResponse>, Error, LoginForm>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/login', data);
      return response.data;
    },
    onSuccess: async (response) => {
      try {
        console.log("[로그인] 일반 로그인 성공, 응답:", response);
        const { accessToken, name, id, email } = response.data;
        
        // 사용자 정보 객체 생성
        const user: User = {
          id: id.toString(),
          name: name || '사용자',
          email: email
        };

        // 새로운 login 함수 사용
        login(accessToken, user);

        saveUserInfo(name, email, id.toString());

        await queryClient.invalidateQueries();
        alert(`${name || '사용자'}님 환영합니다!`);
        navigate("/my");
      } catch (error) {
        console.error("[로그인] 로그인 후처리 중 오류:", error);
        setError("로그인은 성공했으나 일부 정보 처리에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("[로그인] 로그인 실패:", error);
      setError("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate(formData);
  };

  const handleGoogleAuth = useCallback(async () => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get("accessToken");
    const name = query.get("name");
    const userId = query.get("userId");
    const email = query.get("email");
    const error = query.get("error");

    if (error) {
      console.error("[로그인] 구글 로그인 실패:", error);
      setError("구글 로그인에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    if (accessToken && userId && name) {
      try {
        console.log("[로그인] 구글 로그인 성공");
        
        // 사용자 정보 객체 생성
        const user: User = {
          id: userId,
          name: name,
          email: email
        };

        // 새로운 login 함수 사용
        login(accessToken, user);
        
        saveUserInfo(name, email, userId);

        await queryClient.invalidateQueries();
        alert(`${name || '사용자'}님 환영합니다!`);
        navigate("/my");
      } catch (error) {
        console.error("[로그인] 구글 로그인 후처리 중 오류:", error);
        setError("로그인은 성공했으나 일부 정보 처리에 실패했습니다.");
      }
    }
  }, [location, navigate, login, queryClient]);

  useEffect(() => {
    handleGoogleAuth();
  }, [handleGoogleAuth]);

  const handleGoogleLogin = () => {
    const googleAuthUrl = `${import.meta.env.VITE_SERVER_API_URL}/auth/google`;
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="이메일 주소"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google 계정으로 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 