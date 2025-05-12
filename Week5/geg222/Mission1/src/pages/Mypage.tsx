import React, { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserData {
  name: string;
  avatar: string;
  email: string;
}

const Mypage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response.data);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">{data.name}님 환영합니다.</h1>
      <img src={data.avatar} alt="profile" className="w-32 h-32 rounded-full mb-4" />
      <p className="text-lg mb-6">{data.email}</p>
      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90 transition-transform"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Mypage;
