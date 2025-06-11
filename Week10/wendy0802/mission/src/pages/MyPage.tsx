import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  /
  useEffect(() => {
    const storedEmail = localStorage.getItem("signup_email") || "";
    const storedNickname = localStorage.getItem("signup_nickname") || "";
    setEmail(storedEmail);
    setNickname(storedNickname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("signup_email");
    localStorage.removeItem("signup_password");
    localStorage.removeItem("signup_nickname");
    localStorage.removeItem("signup_step");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#dbdcdd] flex items-center justify-center text-white">
      <div className="w-[90%] max-w-md bg-[#2f9ec3] rounded-lg shadow-lg p-6 text-left space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4" >마이페이지</h1>
        <p className="text-sm">
          <span className="font-semibold">이메일:</span> {email}
        </p>
        <p className="text-sm">
          <span className="font-semibold">닉네임:</span> {nickname}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-[skyblue] transition"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
