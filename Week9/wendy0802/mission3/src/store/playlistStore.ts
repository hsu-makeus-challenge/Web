import { create } from 'zustand'

interface Song {
  id: string
  title: string
  artist: string
  duration: string
}

interface PlaylistStore {
  songs: Song[]
  currentSong: Song | null
  isPlaying: boolean
  addSong: (song: Song) => void
  removeSong: (id: string) => void
  setCurrentSong: (song: Song) => void
  togglePlay: () => void
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  songs: [],
  currentSong: null,
  isPlaying: false,
  addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
  removeSong: (id) => set((state) => ({ 
    songs: state.songs.filter((song) => song.id !== id),
    currentSong: state.currentSong?.id === id ? null : state.currentSong
  })),
  setCurrentSong: (song) => set({ currentSong: song, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
})) 