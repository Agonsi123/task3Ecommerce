import { createSlice } from "@reduxjs/toolkit";

// Save selected product in localStorage if available


let savedProduct = null;
try{
    const raw = localStorage.getItem("selectedProduct");
    if (raw && raw !== "undefined") {
        savedProduct = JSON.parse(raw);
    }
}catch (error) {
    console.warn("failed to parse selectedProduct from localStorage:", error);
}

// Load wishlist from localStorage
let savedWishlist = [];
try{
    const raw = localStorage.getItem("wishlist");
    if (raw && raw !== "undefined") {
        savedWishlist = JSON.parse(raw);
    }
}catch (error) {
    console.warn("failed to parse wishlist from localStorage:", error);
}

const productSlice = createSlice({
    name: "product",
    initialState: {
        selectedProduct: savedProduct || null,
        wishlist: savedWishlist || [],
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            // Save only serializable data
            const {eye, heart, image, color, star, ...rest} = action.payload;

            const serializablePayload = {
                ...rest,
                eye: typeof eye === "string" ? eye : "",
                heart: typeof heart === "string" ? heart : "",
                image: typeof image === "string" ? image : "",
                color: typeof color === "string" ? color : "",
                star: typeof star === "string" ? star : "",
            };

            state.selectedProduct = serializablePayload;
            localStorage.setItem("selectedProduct", JSON.stringify(serializablePayload));
    
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
            localStorage.removeItem("selectedProduct");
        },

        addToWishlist: (state, action) => {
            const product = action.payload;
            const exists = state.wishlist.find(item => item.id === product.id);
            if (!exists) {
                state.wishlist.push(product);
                localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
            }
        },

        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlist = state.wishlist.filter(item => item.id !== productId);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        },
        removeMultipleFromWishlist: (state, action) => {
            const idsToRemove = action.payload;
            state.wishlist = state.wishlist.filter(item => !idsToRemove.includes(item.id));
        },
    },
});

export const { setSelectedProduct, clearSelectedProduct, addToWishlist, removeFromWishlist, removeMultipleFromWishlist } = productSlice.actions;

export default productSlice.reducer;
