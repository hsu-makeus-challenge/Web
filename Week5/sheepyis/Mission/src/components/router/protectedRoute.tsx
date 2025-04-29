import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../spinner/spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const accessToken = localStorage.getItem("accessToken");

    if (isLoggedIn && accessToken) {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
