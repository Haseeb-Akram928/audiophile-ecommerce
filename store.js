import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/helper";
import { supabase } from "@/lib/supabase";
import { pushCartToSupabase } from "@/services/apiCart";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  preloadedState: {
    cart: loadFromLocalStorage() || [],
  },
});

store.subscribe(async () => {
  const cart = store.getState().cart;
  saveToLocalStorage(cart);

  // Sync to backend conditionally
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    pushCartToSupabase(session.user.id, cart);
  }
});
