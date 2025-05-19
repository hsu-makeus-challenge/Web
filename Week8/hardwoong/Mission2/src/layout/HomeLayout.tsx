import { Outlet } from "react-router-dom"
import { useState, useRef } from "react";
import Navbar from "../components/Navbar.tsx"
import Footer from "../components/Footer.tsx";
import Sidebar from "../components/Sidebar.tsx";
import LpAddButton from "../components/LpAddButton.tsx";
import LpModal from "../components/LpModal.tsx";
import QuitModal from "../components/QuitModal.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const { accessToken } = useAuth();
  
  return (
    <div className="relative min-h-screen bg-[#121212] text-white flex">
      <div className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar ref={sidebarRef} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onRequestQuit={() => setIsQuitModalOpen(true)} />
      </div>

      <div className={`relative ${sidebarOpen ? "ml-56" : "ml-0"} flex flex-col flex-1 min-h-screen transition-all duration-300`}>
        <div className="fixed left-0 right-0 top-0 z-40 transition-all duration-300">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        {sidebarOpen && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-[10]"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="relative flex-1 p-6 overflow-auto bg-[#121212] mt-13 z-0">
          <Outlet />
        </main>
        {accessToken && <LpAddButton onClick={() => setIsModalOpen(true)} />}
        {isModalOpen && accessToken && <LpModal onClose={() => setIsModalOpen(false)} />}
        {isQuitModalOpen && <QuitModal onClose={() => setIsQuitModalOpen(false)} />}
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout
