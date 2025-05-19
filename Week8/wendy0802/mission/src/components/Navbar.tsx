import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getMyInfo } from '../api/auth';
import type { ApiResponse, UserInfo } from '../types/api';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { accessToken, logout } = useAuth();
  const { isOpen, toggleSidebar } = useSidebar();

  const [userName, setUserName] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const savedNickname = localStorage.getItem('signup_nickname');

    if (accessToken) {
      setIsLoggedIn(true);
      getMyInfo()
        .then((user: ApiResponse<UserInfo>) => {
          setUserName(user.data.name);
          localStorage.setItem('signup_nickname', user.data.name);
        })
        .catch((err) => {
          console.error('사용자 정보를 가져오는데 실패했습니다:', err);
          if (savedNickname) setUserName(savedNickname);
        });
    } else if (savedNickname) {
      setIsLoggedIn(true);
      setUserName(savedNickname);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUserName('');
      localStorage.removeItem('signup_nickname');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <nav className="bg-black text-white h-16 flex items-center justify-between px-4 fixed w-full top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
          className={`transition transform duration-300 ${
            isOpen ? 'text-green-400' : 'text-white'
          }`}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <Link to="/" className="text-xl font-bold text-green-500">
          spiningLP
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-white text-green-500 border-2 border-green-500 hover:bg-green-50 transition"
            >
              회원가입
            </Link>
          </>
        ) : (
          <>
            <span className="text-green-500 font-medium z-index">
              {userName}님 환영합니다
            </span>
            <Link
              to="/my"
              className="text-green-500 hover:text-green-200 transition"
            >
              MY PAGE
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
