import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation();

  const { accessToken } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${
          open ? 'block md:hidden opacity-100' : 'hidden opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed md:static top-18 left-0 h-full w-60 bg-gray-700 text-white z-50 transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div className="space-y-4">
            <Link
              to="/"
              className={`flex items-center ${
                isActive('/search')
                  ? 'text-pink-500'
                  : 'text-white hover:text-pink-500'
              }`}
              onClick={onClose}
            >
              <span className="w-5 h-5 mr-2"></span>
              🔍 찾기
            </Link>

            <Link
              to="/my-page"
              className={`flex items-center ${
                isActive('/my-page')
                  ? 'text-pink-500'
                  : 'text-white hover:text-pink-500'
              }`}
              onClick={onClose}
            >
              <span className="w-5 h-5 mr-2"></span>
              👤 마이페이지
            </Link>
          </div>

          {accessToken && (
            <button
              onClick={() => {}}
              className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              탈퇴하기
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
