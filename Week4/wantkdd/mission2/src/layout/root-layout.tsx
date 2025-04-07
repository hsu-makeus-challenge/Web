import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';

const RootLayout = () => {
  return (
    <div className="bg-gray-800">
      <Navbar />
      <hr className="border-white" />
      <Outlet />
    </div>
  );
};

export default RootLayout;
