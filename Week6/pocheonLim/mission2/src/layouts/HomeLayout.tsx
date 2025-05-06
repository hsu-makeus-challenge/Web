import { Outlet } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const SIDEBAR_WIDTH = 240; // w-60 = 240px
const BREAKPOINT = 768;

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= BREAKPOINT);
  const prevIsDesktop = useRef(window.innerWidth >= BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= BREAKPOINT;
      
      if (!prevIsDesktop.current && isDesktop) {
        setSidebarOpen(true);
      }

      if (prevIsDesktop.current && !isDesktop) {
        setSidebarOpen(false);
      }
      prevIsDesktop.current = isDesktop;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 햄버거 버튼: 언제든 토글
  const handleHamburgerClick = () => setSidebarOpen((prev) => !prev);

  const marginLeft = sidebarOpen ? SIDEBAR_WIDTH : 0;

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft }}
      >
        <Header onHamburgerClick={handleHamburgerClick} />
        {/* Main Content */}
        <main style={{ paddingTop: 60 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout; 