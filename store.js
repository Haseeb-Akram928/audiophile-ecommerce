import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/helper";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  preloadedState: {
    cart: loadFromLocalStorage() || [],
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().cart);
});
