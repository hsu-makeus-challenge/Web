import { createContext, useContext, useState, PropsWithChildren, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginApi, logoutApi, getMyInfo } from "../api/auth";
import { LOCAL_STORAGE_KEY } from "../constants/storage";
import { LoginRequest } from "../api/auth";

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signData: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => { },
  logout: async () => { },
  setAccessToken: function (token: string | null): void {
    throw new Error("Function not implemented.");
  },
  setRefreshToken: function (token: string | null): void {
    throw new Error("Function not implemented.");
  },
  user: null,
  setUser: function (user: User | null): void {
    throw new Error("Function not implemented.");
  },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (accessToken) {
      getMyInfo().then((res: { data: User }) => setUser(res.data)).catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [accessToken]);

  const login = async (signinData: LoginRequest) => {
    try {
      const { data } = await loginApi(signinData);

      const newAccessToken = data.accessToken;
      const newRefreshToken = data.refreshToken;

      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 성공!");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, setAccessToken, setRefreshToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

