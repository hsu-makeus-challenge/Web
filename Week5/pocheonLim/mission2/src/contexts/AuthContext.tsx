import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getUserInfo, UserInfoResponse } from '../apis/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInfoResponse['data'] | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfoResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getUserInfo();
        if (response.status) {
          setUser(response.data);
          setIsLoggedIn(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error('사용자 정보 조회 중 오류 발생:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    await fetchUserInfo();
  };

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      if (response.status) {
        setUser(response.data);
        setIsLoggedIn(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error('사용자 정보 조회 중 오류 발생:', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('컨텍스트 사용 에러다');
  }
  return context;
}; 