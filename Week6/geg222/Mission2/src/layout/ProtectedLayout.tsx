import React, { use } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (!accessToken) {
    return <Navigate to={"/login"} state={location} replace />;
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 overflow-y-auto mt-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
