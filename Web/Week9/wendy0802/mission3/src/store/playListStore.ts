import { create } from 'zustand';

type Song = {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
};

type PlayListState = {
  songs: Song[];
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  clear: () => void;
};

export const usePlayListStore = create<PlayListState>((set) => ({
  songs: [],
  addSong: (song) =>
    set((state) => ({
      songs: [...state.songs, song],
    })),
  removeSong: (id) =>
    set((state) => ({
      songs: state.songs.filter((song) => song.id !== id),
    })),
  clear: () => set({ songs: [] }),
}));