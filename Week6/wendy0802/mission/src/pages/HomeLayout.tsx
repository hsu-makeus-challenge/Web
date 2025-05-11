import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useSidebar } from '../context/SidebarContext';

const HomeLayout = () => {
  const { isOpen } = useSidebar();

  return (
    <div className="w-full min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <div className="flex flex-1" style={{ paddingTop: '60px' }}> {/* Navbar 높이만큼 여백 */}
        {/* 사이드바 */}
        <Sidebar />
        
        {/* 메인 콘텐츠 영역 - 사이드바가 열리면 왼쪽에 여백 추가 */}
        <div 
          className={`flex-1 p-6 transition-all duration-300 ${isOpen ? 'ml-56' : 'ml-0'}`}
        >
          <Outlet />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomeLayout;
