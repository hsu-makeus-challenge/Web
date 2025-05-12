import { create } from 'zustand';

interface LoginStore {
  isLogin: boolean;
  setLogin: (state: boolean) => void;
  toggleLogin: () => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  setLogin: (state) => set({ isLogin: state }),
  toggleLogin: () => set((prev) => ({ isLogin: !prev.isLogin })),
}));

export default useLoginStore;
