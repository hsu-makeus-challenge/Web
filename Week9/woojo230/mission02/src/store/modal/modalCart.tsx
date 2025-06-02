import { create } from 'zustand';

interface ModalStore {
  isModalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  toggleModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  setModalOpen: (state) => set({ isModalOpen: state }),
  toggleModal: () => set((prev) => ({ isModalOpen: !prev.isModalOpen })),
}));

export default useModalStore;
