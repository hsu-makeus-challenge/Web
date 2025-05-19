import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../apis/auth';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete('/v1/users');
      return res.data;
    },
    onSuccess: () => {
      logout();
      navigate('/login');
    },
  });

  // md 이상에서는 항상 보이고, 그 미만에서는 open일 때만 보임
  return (
    <>
      {/* 오버레이: 모바일/태블릿에서만, 사이드바가 열렸을 때만 보임 */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${open ? 'block md:hidden opacity-100' : 'hidden opacity-0'}`}
        onClick={onClose}
        aria-label="사이드바 오버레이"
      />
      {/* 사이드바 본체 */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#151c26] text-white z-50 pt-16 transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ minWidth: 240 }}
      >
        <div className="flex flex-col h-full">
          <nav className="flex flex-col gap-2 px-6 mt-8">
            <Link to="/" className="flex items-center gap-2 py-2 px-2 rounded hover:bg-[#232b3b]">
              <span className="text-lg">🔍</span>
              <span>찾기</span>
            </Link>
            <Link to="/mypage" className="flex items-center gap-2 py-2 px-2 rounded hover:bg-[#232b3b]">
              <span className="text-lg">👤</span>
              <span>마이페이지</span>
            </Link>
          </nav>
          <div className="mt-auto mb-4 px-6 text-xs text-gray-400">
            <button
              className={`w-full text-left transition-colors ${
                isLoggedIn
                  ? 'text-gray-400 hover:text-red-400 cursor-pointer'
                  : 'text-gray-600 cursor-not-allowed opacity-50'
              }`}
              onClick={() => isLoggedIn && setShowWithdrawModal(true)}
              disabled={!isLoggedIn}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
      {/* 탈퇴 모달 */}
      {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md text-center relative">
            <button className="absolute top-4 right-4 text-white text-xl" onClick={() => setShowWithdrawModal(false)}>✕</button>
            <div className="mb-6 text-lg text-white">정말 탈퇴하시겠습니까?</div>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 text-black px-6 py-2 rounded"
                onClick={() => {
                  setShowWithdrawModal(false);
                  withdrawMutation.mutate();
                }}
                disabled={withdrawMutation.isPending}
              >예</button>
              <button
                className="bg-pink-500 text-white px-6 py-2 rounded"
                onClick={() => setShowWithdrawModal(false)}
              >아니오</button>
            </div>
            {withdrawMutation.isPending && <div className="mt-4 text-sm text-gray-300">탈퇴 처리 중...</div>}
            {withdrawMutation.isError && <div className="mt-4 text-sm text-red-400">탈퇴 중 오류가 발생했습니다.</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar; 