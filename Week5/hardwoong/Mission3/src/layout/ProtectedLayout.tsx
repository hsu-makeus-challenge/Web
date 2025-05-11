import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    alert("로그아웃 상태입니다! 로그인 화면으로 이동합니다.");
    return <Navigate to={"/login"} state={{ location }} replace />
  }

  return (
  <div>
    <Navbar />
    <Outlet />
  </div>
);
}

export default ProtectedLayout;