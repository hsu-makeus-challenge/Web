import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen } = useSidebar();

  return (
    <div 
      className={`
        fixed top-16 left-0 
        flex flex-col gap-4 p-6 
        bg-gray-900 min-h-screen 
        text-white
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-48 translate-x-0' : 'w-0 -translate-x-full'}
      `}
    >
      {isOpen && (
        <>
          <button
            className="py-2 px-4 rounded hover:bg-gray-800 text-left"
            onClick={() => navigate('/search')}
          >
            찾기
          </button>
          <button
            className="py-2 px-4 rounded hover:bg-gray-800 text-left"
            onClick={() => navigate('/MyPage')}
          >
            마이페이지
          </button>
          <button
            className="py-2 px-4 rounded text-red-400 hover:text-red-600 text-left"
            onClick={() => setShowModal(true)}
          >
            탈퇴하기
          </button>
        </>
      )}
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center min-w-[340px] relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
              onClick={() => setShowModal(false)}
            >×</button>
            <div className="text-white text-lg mb-8 mt-2">정말 탈퇴하시겠습니까?</div>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-bold hover:bg-gray-400"
                
              >
                예
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-600"
                onClick={() => setShowModal(false)}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;