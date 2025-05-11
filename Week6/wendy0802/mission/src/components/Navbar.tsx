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
  const { openSidebar } = useSidebar();
  const [userName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // 로컬 스토리지에서 닉네임 확인
    const nickname = localStorage.getItem('signup_nickname');
    
    // 로그인 상태 확인 (accessToken이 있거나 nickname이 있으면 로그인 상태)
    if (accessToken || nickname) {
      setIsLoggedIn(true);
      
      // userName 설정 - API 또는 로컬 스토리지에서
      if (accessToken) {
        const fetchUserInfo = async () => {
          try {
            const response = await getMyInfo();
            setUserName(response.data.name);
          } catch (error) {
            console.error('사용자 정보를 가져오는데 실패했습니다:', error);
            // API 호출 실패 시 로컬 스토리지 데이터 사용
            if (nickname) setUserName(nickname);
          }
        };
        fetchUserInfo();
      } else if (nickname) {
        // accessToken 없이 nickname만 있는 경우
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
      <div className="flex items-center justify-between px-8 p-4">
        <Link 
          to="/"
          className="text-xl font-bold text-green-500"
        >
          spiningLP
        </Link>
        
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
          
          <Link 
            to="/search" 
            className="text-green-500 hover:text-green-200 t