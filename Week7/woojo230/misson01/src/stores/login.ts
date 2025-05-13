import { create } from 'zustand';

interface LoginStore {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setLogin: (state: boolean) => void;
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
    toggleLogin: () => set((prev) => ({ isLogin: !prev.isLogin })),
  };
});

export default useLoginStore;
