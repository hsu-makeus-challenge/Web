import { createSlice } from '@reduxjs/toolkit';

// modalSlice.ts 또는 modalslice.ts
export interface Movie {
  backdrop_path: string;
  title: string;
  original_title?: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  popularity: number;
  overview: string;
  imdb_id?: string;
}

export interface ModalState {
  isOpen: boolean;
  movie: Movie | null;
}

// 초기 상태
const initialState: ModalState = {
  isOpen: false,
  movie: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.movie = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.movie = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;