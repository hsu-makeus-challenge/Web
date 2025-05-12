import { create } from 'zustand';

interface LoginStore {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setLogin: (state: boolean) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  toggleLogin: () => void;
}

const useLoginStore = create<LoginStore>((set) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const initialLoginState = !!accessToken;

  return {
    isLogin: initialLoginState,
    accessToken,
    refreshToken,
    setLogin: (state) => set({ isLogin: state }),
    setTokens: (accessToken, refreshToken) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      set({ accessToken, refreshToken, isLogin: true });
    },
    clearTokens: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ accessToken: null, refreshToken: null, isLogin: false });
    },
    toggleLogin: () => set((prev) => ({ isLogin: !prev.isLogin })),
  };
});

export default useLoginStore;
