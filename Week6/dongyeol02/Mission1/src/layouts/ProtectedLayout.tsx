import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?");
    return <Navigate to={"/login"} replace />;
  }
  return (
    <div className="flex h-dvh flex-col ">
      <Navbar
        onSidebarToggle={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <main className="flex-1 mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
