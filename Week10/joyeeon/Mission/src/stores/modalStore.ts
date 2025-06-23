import { create } from 'zustand';

export interface ModatState{
    isOpen: boolean;
    movieId: number | null;
    openModal: (id: number) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModatState>() (
    (set) => ({
        isOpen: false,
        movieId: null,
        openModal: (id: number) => set({ isOpen: true, movieId: id }), // 중요
    closeModal: () => set({ isOpen: false, movieId: null }),
    })
)