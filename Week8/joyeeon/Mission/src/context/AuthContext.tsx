import { createContext, useContext, useEffect, useState } from "react";

import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    name:string|null;
    id: number | null;
    login: (accessToken: string, refreshToken: string, name:string, id:number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    name:null,
    id: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [name, setName] = useState<string|null>(null);
    const [id, setId] = useState<number|null>(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
        const storedRefreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
        const storedName = localStorage.getItem(LOCAL_STORAGE_KEY.name);
        const storedId = localStorage.getItem(LOCAL_STORAGE_KEY.id);


        if (storedAccessToken) setAccessToken(storedAccessToken);
        if (storedRefreshToken) setRefreshToken(storedRefreshToken);
        if (storedName) setName(storedName);
        if (storedId) setId(Number(storedId));
    }, []);

    const login = (newAccessToken: string, newRefreshToken: string, userName:string, userId:number) => {
        console.log("[AuthContext] login() 호출됨");
    console.log("[AuthContext] accessToken 저장할 값:", newAccessToken);
    console.log("[AuthContext] refreshToken 저장할 값:", newRefreshToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setName(userName);
        setId(userId);

        localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.name, userName);
        localStorage.setItem(LOCAL_STORAGE_KEY.id, String(userId));
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setName(null);
        setId(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.name);
        localStorage.removeItem(LOCAL_STORAGE_KEY.id);
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken,name, id, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 