import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { RequestSigninDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postLogout, postSignin, getMyInfo } from "../apis/auth";
import { useMutation } from "@tanstack/react-query";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: number;
    name: string;
    avatar?: string;
  } | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<{
    id: number;
    name: string;
    avatar?: string;
  } | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async () => {},
  logout: async () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  const [user, setUser] = useState<{
    id: number;
    name: string;
    avatar?: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!accessToken) return;

      try {
        const res = await getMyInfo();
        if (res?.data) {
          setUser({
            id: res.data.id,
            name: res.data.name,
            avatar: res.data.avatar ?? "",
          });
        }
      } catch (error) {
        console.error("사용자 정보를 가져오지 못했습니다:", error);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  const loginMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: (res) => {
      const data = res.data;
      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenStorage(newAccessToken);
        setRefreshTokenStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setUser({
          id: data.id,
          name: data.name ?? "테스트유저",
          avatar: data.avatar ?? "",
        });

        alert("로그인 성공");
        window.location.href = "/my";
      }
    },
    onError: (error) => {
      console.error("로그인 오류", error);
      alert("로그인에 실패했습니다.");
    }
  });

  const login = async (signinData: RequestSigninDto) => {
    loginMutation.mutate(signinData);
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      alert("로그아웃 성공");
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, user, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
