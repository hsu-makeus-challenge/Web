import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { axiosInstance } from '../api/axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';

interface User {
  id: number;
  name: string;
  email: string | null;
}

interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => Promise<void>;
  login: (token: string, user: User) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const setAccessToken = (token: string | null) => {
    console.log('[AuthContext] Access Token 설정:', token ? '있음' : '없음');
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      delete axiosInstance.defaults.headers.common['Authorization'];
      setIsLoggedIn(false);
    }
    setAccessTokenState(token);
  };

  const login = (token: string, user: User) => {
    console.log('[AuthContext] 로그인:', { token: token ? '있음' : '없음', user });
    setAccessToken(token);
    // User 객체의 타입을 보장하며, 각 필드 사용
    if (user && typeof user === 'object') {
      if (user.email) {
        localStorage.setItem(LOCAL_STORAGE_KEY.email, user.email);
      }
      localStorage.setItem(LOCAL_STORAGE_KEY.nickname, user.name || '사용자');
      localStorage.setItem(LOCAL_STORAGE_KEY.userId, String(user.id));
      setUser(user);
    }
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
      localStorage.removeItem(LOCAL_STORAGE_KEY.nickname);
      localStorage.removeItem(LOCAL_STORAGE_KEY.email);
      localStorage.removeItem(LOCAL_STORAGE_KEY.userId);
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
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
        login,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};