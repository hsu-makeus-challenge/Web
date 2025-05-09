import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const HomeLayout = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-row">
        <Sidebar />
        <div className="flex-1 px-10">
        <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
