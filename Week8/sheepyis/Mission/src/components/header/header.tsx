import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from 'react-icons/fa';
import { useAuthLogoutMutation } from "../../hooks/auth/useAuthLogoutMutation";
import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const { data: meData, isLoading: isMeLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await AuthAPI.get("/users/me");
      return res.data;
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });

  const logoutMutation = useAuthLogoutMutation(() => {
    alert("로그아웃 되었습니다.");
    setIsLoggedIn(false);
    navigate("/");
  });

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full h-[3vw] items-center flex justify-between px-[2vw] bg-gray-800 text-white">
      <div className="flex items-center gap-[2vw]">
        <FaBars className="w-[1.5vw] cursor-pointer" onClick={toggleSidebar} />
        <p className="text-pink-400 text-[1.5vw] font-bold cursor-pointer" onClick={handleHomeClick}>
          돌려돌려LP판
        </p>
      </div>
      <div className="flex gap-[1vw]">
        {isLoggedIn ? (
          <div className="flex items-center gap-[1vw]">
            {!isMeLoading && meData ? (
              <p className="text-[1vw]">{meData.data.name}님 반갑습니다.</p>
            ) : (
              <p className="text-[1vw]">불러오는 중...</p>
            )}
            <button
              onClick={() => logoutMutation.mutate()}
              className="bg-red-600 px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw] cursor-pointer"
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
            </button>
          </div>
        ) : (
          <div className="flex gap-[1vw]">
            <button onClick={handleLoginClick} className="bg-black px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw] cursor-pointer">
              로그인
            </button>
            <button onClick={handleSignUpClick} className="bg-blue-800 px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw] cursor-pointer">
              회원가입
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
