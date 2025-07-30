import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isLoggedIn: false,
        user: {
            name: '',
            identifier: '',
        },
    },
    reducers:{
        signup: (state, action) => {
            state.isAuth = true;
            
            state.user = action.payload;
        },
        login: (state, action) => {
            state.isAuth = true;
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.isLoggedIn = false;
            state.user = {
                name: '',
                identifier: '',
            }
        }
    }
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;