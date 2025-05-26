import { create } from 'zustand';

export interface ModatState{
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useModalStore = create<ModatState>() (
    (set) => ({
        isOpen: false,
        openModal: () => set({ isOpen: true }),
        closeModal: () => set({ isOpen: false }),
    })
)