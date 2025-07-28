import { createSlice } from "@reduxjs/toolkit";
import inv1 from '../assets/images/inv1.svg';
import inv2 from '../assets/images/inv2.svg';
import inv3 from "../assets/images/inv3.svg";
import inv4 from "../assets/images/inv4.svg";
import inv5 from "../assets/images/inv5.svg";
import inv6 from "../assets/images/inv6.svg";
import inv7 from "../assets/images/inv7.svg";
import inv8 from "../assets/images/inv8.svg";
import inv9 from "../assets/images/inv9.svg";
import inv10 from "../assets/images/inv10.svg";



const initialState = {
        products: [
        {
            id: 1,
            image: inv1,
            title: "Gucci bag",
            price: 960,
            quantity: 1,
        },
        {
            id: 2,
            image: inv2,
            title: "CPU Cooler",
            price: 1960,
            quantity: 1,
        },
        {
            id: 3,
            image: inv3,
            title: "GP11 Gamepad",
            price: 550,
            quantity: 1,
        },
        {
            id: 4,
            image: inv4,
            title: "Quilted Jacket",
            price: 750,
            quantity: 1,
        },
        {
            id: 5,
            image: inv5,
            title: "ASUS Laptop",
            price: 960,
            quantity: 1,
        },
        {
            id: 6,
            image: inv6,
            title: "LCD Monitor",
            price: 1160,
            quantity: 1,
        },
        {
            id: 7,
            image: inv7,
            title: "HV-G92 Gamepad",
            price: 560,
            quantity: 1,
        },
        {
            id: 8,
            image:inv8,
            title: "Wired Keyboard",
            price: 200,
            quantity: 1,
        },
        {
            id: 9,
            image: inv9,
            title: "CANON Camera",
            price: 200,
            quantity: 1,
        },
        {
            id: 10,
            image: inv10,
            title: "S-Series Chair",
            price: 200,
            quantity: 1,
        },
    ],
    cart: [],
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        //To add item to cart
        addToCart: (state, actions) => {
            const id = actions.payload;
            // const incomingItem = actions.payload;
            const item = state.products.find((product) => product.id === id);
            // const existingItem = state.cart.find(item => item.id === incomingItem.id);
            const cartItem = state.cart.find((item) => item.id === id);
            
            if (cartItem){
                cartItem.quantity += 1;
            }else if (item) {
            state.cart.push({
                ...item,
                quantity: 1,
                });
            }
            // if (existingItem) {
            //     existingItem.quantity += incomingItem.quantity || 1
            // }else {
            //     state.cart.push({
            //         ...incomingItem,
            //         quantity: incomingItem.quantity || 1
            //     });
            // }
        },
        // To remove item from cart
        removeFromCart : (state, actions) => {
            state.cart = state.cart.filter(item => item.id !== actions.payload);
        },
        //To update item quantities
        setQuantity: (state, action) => {
            const { id, quantity} = action.payload;
            const cartItem = state.cart.find((item) => item.id === id);
            if (cartItem) {
                cartItem.quantity = quantity;
            }
        },
        //Reducer to checkout of cart
        checkout: (state) => {
            state.cart = [];
        },
        //Reducer to clear cart
        clearCart: (state) => {
            state.cart = [];
        },
        // Reducer to add multiple products to cart
        addMultipleToCart: (state, action) => {
            const ids = action.payload;

            ids.forEach(id => {
                const item = state.products.find((product) => product.id === id);
                const cartItem = state.cart.find((item) => item.id === id);

                if (cartItem) {
                    cartItem.quantity += 1
                }else if (item) {
                    state.cart.push({ ...item, quantity: 1});
                }
            });
        },
    }
});
export const { addToCart, removeFromCart, setQuantity, checkout, clearCart, addMultipleToCart } = inventorySlice.actions;

export default inventorySlice.reducer;