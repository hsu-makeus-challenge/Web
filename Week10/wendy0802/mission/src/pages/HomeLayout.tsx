 
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
