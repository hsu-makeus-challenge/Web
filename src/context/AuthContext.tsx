import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { axiosInstance } from '../api/axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';

interface User {
  id: string;
  name: string;
  email: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  login: (token: string, userData: User) => void;
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // 앱 시작시 토큰과 사용자 정보 복원
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY.user);
    
    if (token && savedUser) {
      setAccessToken(token);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
    localStorage.setItem(LOCAL_STORAGE_KEY.user, JSON.stringify(userData));
    setAccessToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.user);
      localStorage.removeItem('signup_email');
      localStorage.removeItem('signup_nickname');
      localStorage.removeItem('userId');
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 