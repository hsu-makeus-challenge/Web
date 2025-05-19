import { useEffect } from 'react';
import useLocalStorage from '../hooks/auth/useLocalStorage';

const GoogleLoginRidirectPage = () => {
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setRefreshToken] = useLocalStorage('refreshToken', '');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = '/mypage';
    }
  }, [setAccessToken, setRefreshToken]);

  return <div>구글 로그인 리다이렉트 처리 중...</div>;
};

export default GoogleLoginRidirectPage;

