import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // 화면 크기 변경 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 사이드바 외부 클릭시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile && 
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile]);

  return (
    <>
      {/* 모바일 햄버거 버튼 */}
      {isMobile && (
        <button 
          ref={burgerRef}
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
      )}

      {/* 사이드바 */}
      <aside 
        ref={sidebarRef}
        className={`
          transition-all duration-300 ease-in-out 
          bg-black text-white min-h-screen flex flex-col justify-between 
          ${isMobile ? 'fixed left-0 top-0 z-40 shadow-xl' : 'w-56'} 
          ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div>
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

      {/* 모바일에서 사이드바 열렸을 때 오버레이 */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;