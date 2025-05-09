import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { accessToken } = useAuth();

  return (
    <nav className="bg-black dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="flex items-center justify-between px-8 p-4">
        <Link 
          to="/"
          className="text-xl font-bold text-white"
        >
          spinnigLP
        </Link>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleDarkMode}
            className="text-green-500 hover:text-green-300 transition"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          
          {!accessToken ? (
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
            <Link 
              to="/my" 
              className="text-green-500 hover:text-green-200 transition"
            >
              MY PAGE
            </Link>
          )}
          
          <Link 
            to="/search" 
            className="text-green-500 hover:text-green-200 transition"
          >
            검색
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;