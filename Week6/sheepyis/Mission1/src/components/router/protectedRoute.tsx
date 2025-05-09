import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../spinner/spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setShowAlert(true);
    }

    setChecking(false);
  }, []);

  if (checking) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    if (showAlert) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    }

    return <Navigate to="/login" replace />;
  }

  return (
      <div className="w-[100%] flex justify-center">
        {children}
      </div>
    )
};

export default ProtectedRoute;
