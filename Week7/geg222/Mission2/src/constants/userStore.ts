import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // 사용자 프로필 이미지 URL (선택 사항)
  // 필요한 경우 추가 필드: role 등
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
