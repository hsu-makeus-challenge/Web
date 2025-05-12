import { createContext, useContext, useState, PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginApi, logoutApi } from "../api/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { LoginRequest } from "../api/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signData: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;

  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
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
  }
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
      alert("로그아웃 성공");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout,setAccessToken,
      setRefreshToken  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

