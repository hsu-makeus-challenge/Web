import {create} from 'zustand';
import { getMyInfo } from "../apis/users";
import type { UserInfo } from "../types/mypage";

interface MypageState {
    userInfo: UserInfo | null;
    fetchUserInfo: () => Promise<void>;
    clearUserInfo: () => void;
    setUserInfo: (data: UserInfo) => void;
}

export const useMypageStore = create<MypageState>((set) => ({   
    userInfo: null,
    fetchUserInfo: async () => {
        try {
            const response = await getMyInfo();
            set({ userInfo: response });
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    },
    clearUserInfo: () => set({ userInfo: null }),
    setUserInfo: (data) => set({ userInfo: data }),
}));