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
    <div>
      <h1>{data?.data?.name}님 환영합니다.</h1>
      <img src={data.data?.avatar as string} alt={"구글로고"} />
      <h1>{data.data?.email}</h1>

      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Mypage;
