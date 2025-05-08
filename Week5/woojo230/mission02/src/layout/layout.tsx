import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-6 px-4" />
      <Outlet />
    </>
  );
};

export default Mainlayout;
