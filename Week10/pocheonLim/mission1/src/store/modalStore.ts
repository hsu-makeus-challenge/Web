import { create } from 'zustand';
import type { Movie } from '../types/movie';

interface ModalStore {
  isOpen: boolean;
  selectedMovie: Movie | null;
  openModal: (movie: Movie) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  selectedMovie: null,
  openModal: (movie) => set({ isOpen: true, selectedMovie: movie }),
  closeModal: () => set({ isOpen: false, selectedMovie: null }),
}));

export default useModalStore; 