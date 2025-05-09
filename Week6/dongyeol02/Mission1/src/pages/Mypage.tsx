import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const nagivate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  console.log(data?.data?.name);

  const handleLogout = async () => {
    await logout();
    nagivate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
      <div className="bg-white px-10 py-12 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold">
          {data?.data?.name}님 환영합니다
        </h1>
        <img
          src={data.data?.avatar as string}
          alt="프로필 사진"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="text-gray-700">{data.data?.email}</h2>

        <button
          className="w-48 bg-blue-600 text-white py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Mypage;
