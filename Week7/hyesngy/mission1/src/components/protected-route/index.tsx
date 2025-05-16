import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@hooks/use-auth";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
