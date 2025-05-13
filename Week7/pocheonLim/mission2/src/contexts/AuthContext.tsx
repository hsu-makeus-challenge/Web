import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getUserInfo } from '../apis/auth';

interface User {
  id: number;
  email: string;
  name: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuthStorage = () => {
  const getTokens = () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  });

  const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return { getTokens, setTokens, clearTokens };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getTokens, setTokens, clearTokens } = useAuthStorage();

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      if (response.status) {
        setUser(response.data);
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('사용자 정보 조회 중 오류 발생:', error);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const { accessToken } = getTokens();
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      const success = await fetchUserInfo();
      if (!success) {
        logout();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (accessToken: string, refreshToken: string) => {
    setTokens(accessToken, refreshToken);
    await fetchUserInfo();
  };

  const logout = () => {
    clearTokens();
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내에서만 사용할 수 있습니다.');
  }
  return context;
}; 