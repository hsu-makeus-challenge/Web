import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { getMyInfo } from '../api/auth';
import { FaBars } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { accessToken, logout } = useAuth();
  const { toggleSidebar, isMobile } = useSidebar();
  const [userName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const nickname = localStorage.getItem('signup_nickname');
    
    if (accessToken || nickname) {
      setIsLoggedIn(true);
      if (accessToken) {
        const fetchUserInfo = async () => {
          try {
            const response = await getMyInfo();
            setUserName(response.data.name);
          } catch (error) {
            console.error('사용자 정보를 가져오는데 실패했습니다:', error);
            if (nickname) setUserName(nickname);
          }
        };
        fetchUserInfo();
      } else if (nickname) {
        setUserName(nickname);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUserName("");
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <nav className="bg-black dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button 
            className="text-white hover:text-green-400 transition"
            onClick={toggleSidebar}
            aria-label="사이드바 열기/닫기"
          >
            <FaBars size={24} />
          </button>
          <Link 
            to="/"
            className="text-xl font-bold text-green-500"
          >
            spiningLP
          </Link>
        </div>

        {/* 로그인/회원가입 버튼 */}
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
              <span className="text-green-500 font-medium">
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
      </div>
    </nav>
  );
};

export default Navbar;