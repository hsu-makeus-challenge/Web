import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
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
          <div className="mt-auto mb-4 px-6 text-xs text-gray-400">탈퇴하기</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 