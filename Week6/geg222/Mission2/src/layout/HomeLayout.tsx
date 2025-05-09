import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Sidebar from "../components/Sidebar.tsx";
import { useAuth } from "../context/AuthContext";

const HomeLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user } = useAuth();
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {isHome && (
          <aside className="p-2 border-r border-neutral-950 flex-shrink-0 overflow-y-auto">
            <Sidebar user={user} />
          </aside>
        )}
        <main className="flex-1 p-4 overflow-y-auto mt-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
