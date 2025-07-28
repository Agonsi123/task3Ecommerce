import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user: {
            name: '',
            identifier: '',
        }
    },
    reducers:{
        login: (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = {
                name: '',
                identifier: '',
            }
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;