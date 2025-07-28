import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import modalReducer from './modalSlice';
import inventoryReducer from './inventorySlice';
import productReducer from './productSlice';
import formReducer from './formSlice';
import menuReducer from './menuSlice';


export const store = configureStore({
    reducer:{
        auth: authReducer,
        modal: modalReducer,
        inventory: inventoryReducer,
        product: productReducer,
        form: formReducer,
        menu: menuReducer,
    },
});