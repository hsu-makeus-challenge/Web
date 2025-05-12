import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const { isOpen } = useSidebar();

  return (
    <div 
      className={`h-full w-40 bg-black text-white flex-shrink-0 transition-all duration-300 ${
        isOpen ? 'relative' : 'absolute -left-40'
      }`}
    >
      <div className="p-4">
        <div className="mb-6">
          <Link to="/search" className="block py-2 text-gray-300 hover:text-white">
            찾기
          </Link>
        </div>
        <div className="mb-6">
          <Link to="/my" className="block py-2 text-gray-300 hover:text-white">
            마이페이지
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-4">
        <button className="text-gray-400 hover:text-gray-200 text-sm">
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default Sidebar;