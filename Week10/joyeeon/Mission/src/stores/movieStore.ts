import { create } from 'zustand'
import axios from 'axios';

interface MovieState<T = any> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    fetchMovies: (endpoint: string) => void;
}

const baseURL = "https://api.themoviedb.org/3";

export const useMovieStore = create<MovieState>((set) => ({
    data: null,
    isLoading: false,
    error: null,
    
    fetchMovies: async (endpoint: string) => {
        const token = import.meta.env.VITE_TMDB_TOKEN;
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(`${baseURL}/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ data: response.data, isLoading: false });
        } catch (error: any) {
            set({ error, isLoading: false });
        }
    }

}));