import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage (optional)
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn("Failed to load cart from localStorage:", error);
    return [];
  }
};

const initialState = {
  cart: loadCartFromStorage(),
  subtotal: 0,
  total: 0,
};

const calculateTotals = (cart) => {
  const subtotal = cart.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("$", ""))
        : Number(item.price) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const total = subtotal;
  return { subtotal, total };
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    //To add item to cart
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        // If product is already in the cart increase quantity
        existing.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      const totals = calculateTotals(state.cart);
      state.subtotal = totals.subtotal;
      state.total = totals.total;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // To remove item from cart
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      const totals = calculateTotals(state.cart);
      state.subtotal = totals.subtotal;
      state.total = totals.total;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    //To update item quantities
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((p) => p.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      const totals = calculateTotals(state.cart);
      state.subtotal = totals.subtotal;
      state.total = totals.total;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    //Reducer to checkout of cart
    checkout: (state) => {
      localStorage.setItem("lastCheckout", JSON.stringify(state.cart));
      state.cart = [];
      state.subtotal = 0;
      state.total = 0;
      localStorage.removeItem("cart");
    },
    //Reducer to clear cart
    clearCart: (state) => {
      state.cart = [];
      state.subtotal = 0;
      state.total = 0;
      localStorage.removeItem("cart");
    },
    // Reducer to add multiple products to cart
    addMultipleToCart: (state, action) => {
      const products = action.payload;

      products.forEach((product) => {
        const existing = state.cart.find((item) => item.id === product.id);

        if (existing) {
          existing.quantity += product.quantity || 1;
        } else {
          state.cart.push({ ...product, quantity: product.quantity || 1 });
        }
      });
      const totals = calculateTotals(state.cart);
      state.subtotal = totals.subtotal;
      state.total = totals.total;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});
export const { addToCart, removeFromCart, setQuantity, checkout, clearCart, addMultipleToCart } =
  inventorySlice.actions;

export default inventorySlice.reducer;
