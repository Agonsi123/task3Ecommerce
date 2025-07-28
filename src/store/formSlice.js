import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: 'form',
    initialState: {
        activeForm: 'regForm',
    },
    reducers: {
        setActiveForm: (state, action) => {
            state.activeForm = action.payload;
        },
    },
});

export const { setActiveForm } = formSlice.actions;
export default formSlice.reducer;