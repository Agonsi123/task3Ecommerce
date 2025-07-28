import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {isActive: false},
    reducers: {
        showModal: (state) => {
            state.isActive = true;
        },
        hideModal: (state) => {
            state.isActive = false;
        },
        toggleModal: (state) => {
            state.isActive = !state.isActive;
        },
    },
});

export const {showModal, hideModal, toggleModal} = modalSlice.actions;


export default modalSlice.reducer;