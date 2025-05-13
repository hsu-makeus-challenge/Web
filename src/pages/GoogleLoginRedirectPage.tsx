import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../api/axios';

const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // 에러 체크
        const error = searchParams.get('error');
        if (error) {
          throw new Error(error);
        }

        // 인증 코드 추출
        const code = searchParams.get('code');
        if (!code) {
          throw new Error('Authorization code not found');
        }

        // 백엔드로 인증 코드 전송
        const response = await axiosInstance.post('/auth/google/callback', { code });
        const { accessToken, user } = response.data;

        // 로그인 처리
        login(accessToken, user);
        
        // 메인 페이지로 리다이렉트
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('Google login error:', err);
        setError(err instanceof Error ? err.message : '구글 로그인에 실패했습니다.');
        // 3초 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    handleGoogleCallback();
  }, [navigate, searchParams, login]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            로그인 오류
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {error}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            잠시 후 로그인 페이지로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          구글 로그인 처리 중...
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
};

export default GoogleLoginRedirectPage; 