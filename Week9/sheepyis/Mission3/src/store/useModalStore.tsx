import { create } from 'zustand';
import type { ModalStore } from '../types/modalStore';

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
