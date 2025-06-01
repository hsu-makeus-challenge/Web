import { createSlice } from '@reduxjs/toolkit';
import { modalInitialState } from '../types/modal';

const modalSlice = createSlice({
    name: 'modal',
    initialState: modalInitialState,
    reducers: {
        // 모달 열기
        openModal(state) {
            state.isOpen = true;
        },

        // 모달 닫기
        closeModal(state) {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;