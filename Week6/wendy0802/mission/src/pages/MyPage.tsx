import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyInfo } from '../api/auth';

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        // 에러 처리
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading) return <div>로딩중...</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다</h1>
      <img src={data?.data?.avatar as string} alt="구글 로고" />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPage;