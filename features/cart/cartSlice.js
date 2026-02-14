import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.push({
          ...action.payload,
          totalPrice: action.payload.quantity * action.payload.price,
        });
      }
    },
    deleteItem(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },
    decreaseItemQuantity(state, action) {
      const itemIndex = state.findIndex((item) => item.id === action.payload);

      if (itemIndex > -1) {
        const item = state[itemIndex];
        item.quantity--;
        item.totalPrice = item.quantity * item.price;

        if (item.quantity === 0) {
          // Remove item if quantity drops to 0
          state.splice(itemIndex, 1);
        }
      }
    },
    clearCart() {
      return [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.reduce((sum, item) => sum + item.totalPrice, 0);