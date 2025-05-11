import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/sideBar/sideBar';
import useSideBarStore from '../stores/sideBar';

const Mainlayout = () => {
  const { isSidebarOpen } = useSideBarStore();
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        {isSidebarOpen && <SideBar />}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Mainlayout;
