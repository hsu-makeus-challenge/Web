import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/navbar.tsx';
import { PropsWithChildren, useState } from 'react';
// import Footer from '../components/footer.tsx';
import Sidebar from '../components/sidebar/sidebar.tsx';

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="bg-gray-800 flex flex-col h-screen">
      <Navbar onMenuClick={toggleSidebar} />
      <hr className="border-gray-700" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-auto p-4">
          {children || <Outlet />}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
