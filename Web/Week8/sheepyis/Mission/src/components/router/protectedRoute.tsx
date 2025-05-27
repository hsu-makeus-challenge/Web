import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../spinner/spinner";
import { AuthAPI } from "../../apis/authAxios";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await AuthAPI.get("/auth/protected");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (checking) return <Spinner />;

  if (!isAuthenticated) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-[100%] flex justify-center">
      {children}
    </div>
  );
};

export default ProtectedRoute;
