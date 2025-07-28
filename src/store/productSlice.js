import { createSlice } from "@reduxjs/toolkit";

// Save selected product in localStorage if available
// const savedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

let savedProduct = null;
try{
    const raw = localStorage.getItem("selectedProduct");
    if (raw && raw !== "undefined") {
        savedProduct = JSON.parse(raw);
    }
}catch (error) {
    console.warn("failed to parse selectedProduct from localStorage:", error);
}

const productSlice = createSlice({
    name: "product",
    initialState: {
        selectedProduct: savedProduct || null,
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            // Save only serializable data
            const {image, color, star, ...rest} = action.payload;

            const serializablePayload = {
                ...rest,
                image: typeof image === "string" ? image : "",
                color: typeof color === "string" ? color : "",
                star: typeof star === "string" ? star : "",
            };

            state.selectedProduct = serializablePayload;
            localStorage.setItem("selectedProduct", JSON.stringify(serializablePayload));
            // state.selectedProduct = action.payload;
            // localStorage.setItem("selectedProduct", JSON.stringify(action.payload));
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
            localStorage.removeItem("selectedProduct");
        },
    },
});

export const {setSelectedProduct, clearSelectedProduct} = productSlice.actions;

export default productSlice.reducer;
