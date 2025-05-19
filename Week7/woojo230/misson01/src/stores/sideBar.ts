import { create } from 'zustand';

interface SideBarStore {
  isSidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  toggleSidebar: () => void;
}

const useSideBarStore = create<SideBarStore>((set) => ({
  isSidebarOpen: true,
  setSidebarOpen: (state) => set({ isSidebarOpen: state }),
  toggleSidebar: () => set((prev) => ({ isSidebarOpen: !prev.isSidebarOpen })),
}));

export default useSideBarStore;
