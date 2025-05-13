import { createContext, useContext, useState, useEffect, PropsWithChildren, ReactNode } from 'react';
import { axiosInstance } from '../api/axios';

interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren): ReactNode => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const setAccessToken = (token: string | null) => {
    console.log('[AuthContext] Access Token 설정:', token ? '있음' : '없음');
    if (token) {
      localStorage.setItem('accessToken', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('accessToken');
      delete axiosInstance.defaults.headers.common['Authorization'];
      setIsLoggedIn(false);
    }
    setAccessTokenState(token);
  };

  const logout = async () => {
    try {
      if (isLoggedIn) {
        await axiosInstance.post('/auth/logout');
      }
    } catch (error) {
      console.error('[AuthContext] 로그아웃 API 호출 실패:', error);
    } finally {
      setAccessToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem('signup_nickname');
      localStorage.removeItem('signup_email');
      localStorage.removeItem('userId');
      
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        accessToken,
        isLoggedIn,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

