import { create } from 'zustand';

interface SignOutStore {
  isSignOutModalOpen: boolean;
  setSignOutModalOpen: (state: boolean) => void;
  toggleSignOutModal: () => void;
}

const useSignOutStore = create<SignOutStore>((set) => ({
  isSignOutModalOpen: false,
  setSignOutModalOpen: (state) => set({ isSignOutModalOpen: state }),
  toggleSignOutModal: () =>
    set((prev) => ({ isSignOutModalOpen: !prev.isSignOutModalOpen })),
}));

export default useSignOutStore;
