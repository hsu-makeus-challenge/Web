import { createContext, useContext, useEffect, useState } from "react";

import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
        const storedRefreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

        if (storedAccessToken) setAccessToken(storedAccessToken);
        if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    }, []);

    const login = (newAccessToken: string, newRefreshToken: string) => {
        console.log("[AuthContext] login() 호출됨");
    console.log("[AuthContext] accessToken 저장할 값:", newAccessToken);
    console.log("[AuthContext] refreshToken 저장할 값:", newRefreshToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 