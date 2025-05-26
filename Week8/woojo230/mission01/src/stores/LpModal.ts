import { create } from 'zustand';

interface LpModalStore {
  isLpModalOpen: boolean;
  setLpModalOpen: (state: boolean) => void;
  toggleLpModal: () => void;
}

const useLpModalStore = create<LpModalStore>((set) => ({
  isLpModalOpen: false,
  setLpModalOpen: (state) => set({ isLpModalOpen: state }),
  toggleLpModal: () => set((prev) => ({ isLpModalOpen: !prev.isLpModalOpen })),
}));

export default useLpModalStore;
