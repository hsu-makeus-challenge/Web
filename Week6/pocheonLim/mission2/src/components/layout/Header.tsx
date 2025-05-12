import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onHamburgerClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHamburgerClick }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="w-full h-16 bg-[#1a2233] flex items-center justify-between px-8 text-white box-border fixed top-0 left-0 z-50">
      {/* 좌측: 햄버거 + 로고 */}
      <div className="flex items-center gap-3">
        <button
          className="text-2xl focus:outline-none mr-2"
          onClick={onHamburgerClick}
          aria-label="사이드바 열기"
        >
          ☰
        </button>
        <Link to="/" className="font-bold text-2xl text-pink-500 tracking-wider">
          DOLIGO
        </Link>
      </div>
      {/* 우측 영역 */}
      <div className="flex items-center gap-4">
        <span className="text-xl ml-2 cursor-pointer" role="img" aria-label="search">
          🔍
        </span>
        {isLoggedIn && user ? (
          <>
            <span className="text-sm">{user.name}님 반갑습니다.</span>
            <button
              className="bg-none border-none text-white cursor-pointer text-base ml-2 hover:underline"
              onClick={logout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-base ml-2 hover:underline">로그인</Link>
            <Link to="/signup" className="text-base ml-2 hover:underline">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 