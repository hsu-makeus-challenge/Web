import { createContext, useContext, useState, useEffect, PropsWithChildren, ReactNode } from 'react';
import axios from 'axios';
import { refreshToken as refreshTokenApi, signOut } from '../api/auth';

const LOCAL_STORAGE_KEY = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
  syncTokensFromStorage: () => boolean;
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
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const setAccessToken = (token: string | null) => {
    console.log('[AuthContext] Access Token 설정:', token ? '있음' : '없음');
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      delete axios.defaults.headers.common['Authorization'];
    }
    setAccessTokenState(token);
    setIsLoggedIn(!!token);
  };

  const setRefreshToken = (token: string | null) => {
    console.log('[AuthContext] Refresh Token 설정:', token ? '있음' : '없음');
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    }
    setRefreshTokenState(token);
  };

  const syncTokensFromStorage = () => {
    const storedAccessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const storedRefreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
    
    console.log('[AuthContext] 토큰 동기화 시도:', {
      accessToken: storedAccessToken ? '있음' : '없음',
      refreshToken: storedRefreshToken ? '있음' : '없음'
    });

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      return true;
    }
    return false;
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const currentRefreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
      if (!currentRefreshToken) {
        throw new Error('Refresh token not found');
      }

      const response = await refreshTokenApi(currentRefreshToken);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      
      return newAccessToken;
    } catch (error) {
      console.error('[AuthContext] 토큰 갱신 실패:', error);
      await logout();
      return null;
    }
  };

  const logout = async () => {
    try {
      if (isLoggedIn) {
        await signOut();
      }
    } catch (error) {
      console.error('[AuthContext] 로그아웃 API 호출 실패:', error);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem('signup_nickname');
    }
  };

  useEffect(() => {
    syncTokensFromStorage();
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && refreshToken) {
          try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken && error.config) {
              error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
              return axios(error.config);
            }
          } catch (refreshError) {
            console.error('[AuthContext] 토큰 갱신 중 오류:', refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken]);

  return (
    <AuthContext.Provider 
      value={{ 
        accessToken, 
        refreshToken, 
        isLoggedIn,
        setAccessToken,
        setRefreshToken,
        logout,
        refreshAccessToken,
        syncTokensFromStorage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

