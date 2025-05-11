import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const HomeLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 flex flex-row">
        <Sidebar />
        <div className="flex-1 px-6 py-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
