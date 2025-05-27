import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/sideBar/sideBar';

const Mainlayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Mainlayout;
