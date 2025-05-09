import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const userId = params.get('userId');
    const name = params.get('name');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', userId || '');
      localStorage.setItem('name', name || '');

      alert('로그인을 성공하였습니다.');
      navigate('/');
    } else {
      console.log("로그인에 실패하셨습니다.");
    }
  }, [navigate]);

  return (
    <div className="flex w-[100%] flex-col items-center">
        <p className="text-[1vw] font-bold">로그인 처리 중입니다..</p>
    </div>
  )
};

export default OAuthCallback;
