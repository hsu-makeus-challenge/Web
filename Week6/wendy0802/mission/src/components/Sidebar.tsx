import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-56 bg-black text-white min-h-screen flex flex-col justify-between ">
      <div>
        <div className="p-6 text-2xl font-bold text-green-400">돌려돌려LP판</div>
        <nav className="flex flex-col font-bold gap-4 p-4">
          <a href="#" className="flex items-center gap-2 hover:text-pink-400">
            <span>🔍</span> 찾기
          </a>
          <a href="#" className="flex items-center font-bold gap-2 hover:text-pink-400">
            <span>👤</span> 마이페이지
          </a>
        </nav>
      </div>
      <div className="p-4 text-gray-400 text-sm">탈퇴하기</div>
    </aside>
  );
};

export default Sidebar;