import { createContext, useContext, useState, useEffect } from 'react';
import { logoutApi, getMyInfo } from '../api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          await getMyInfo();
          setIsAuthenticated(true);
        } catch (error) {
          console.error('인증 확인 실패:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    };
    checkAuth();
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutApi();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

