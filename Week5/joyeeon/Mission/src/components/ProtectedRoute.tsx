import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { accessToken } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // accessToken이 바뀔 때마다 로딩 종료
        setLoading(false);
    }, [accessToken]);

    console.log("[ProtectedRoute] accessToken 상태:", accessToken);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!accessToken) {
        console.log("[ProtectedRoute] 토큰 없음 -> 로그인 페이지로 리다이렉트");
        return <Navigate to="/login" replace />;
    }

    console.log("[ProtectedRoute] 토큰 있음 -> 페이지 접근 허용");
    return <>{children}</>;
};

export default ProtectedRoute;