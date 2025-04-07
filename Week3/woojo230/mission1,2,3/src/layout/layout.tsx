import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Mainlayout;
