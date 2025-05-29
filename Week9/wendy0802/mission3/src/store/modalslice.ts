// src/store/modalSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  type: 'clearCart' | null;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<'clearCart'>) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;