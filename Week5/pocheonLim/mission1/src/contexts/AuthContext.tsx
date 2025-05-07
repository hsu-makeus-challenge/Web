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

  // 앱 시작 시 로컬 스토리지의 토큰 확인
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchUserInfo();
    }
  }, []);

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

  const login = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    await fetchUserInfo();
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
  };

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