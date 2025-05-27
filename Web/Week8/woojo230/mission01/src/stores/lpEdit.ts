import { create } from 'zustand';

interface LpEditStore {
  isLpEditOpen: boolean;
  setLpEditOpen: (state: boolean) => void;
  toggleLpEdit: () => void;
}

const useLpEditStore = create<LpEditStore>((set) => ({
  isLpEditOpen: false,
  setLpEditOpen: (state) => set({ isLpEditOpen: state }),
  toggleLpEdit: () => set((prev) => ({ isLpEditOpen: !prev.isLpEditOpen })),
}));

export default useLpEditStore;
