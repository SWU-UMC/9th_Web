import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
    isOpen: boolean;
}

// 처음 상태
const initialState: ModalState = {
    isOpen: false,
};

// modalSlice 생성
const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;