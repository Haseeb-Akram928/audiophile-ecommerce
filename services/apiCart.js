import { supabase } from "@/lib/supabase";

export async function pushCartToSupabase(userId, cartState) {
  if (!userId) return;
  const { error } = await supabase
    .from("user_carts")
    .upsert(
      { user_id: userId, cart_state: cartState },
      { onConflict: "user_id" }
    );

  if (error) {
    console.error("Error pushing cart to Supabase:", error);
  }
}

export async function fetchSupabaseCart(userId) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("user_carts")
    .select("cart_state")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // Ignore PGRST116 (No rows found)
    throw new Error(error.message);
  }

  return data ? data.cart_state : [];
}

export async function syncCartWithSupabase(userId, localCartState) {
  try {
    const existingState = await fetchSupabaseCart(userId);
    
    const mergedStateMap = new Map();
    // Add existing from supabase first
    existingState.forEach(item => {
       mergedStateMap.set(item.id, { ...item });
    });
    // Add local items (merging quantities if duplicates exist)
    localCartState.forEach(item => {
      if (mergedStateMap.has(item.id)) {
         const existing = mergedStateMap.get(item.id);
         existing.quantity += item.quantity;
         existing.totalPrice = existing.quantity * existing.price;
      } else {
         mergedStateMap.set(item.id, { ...item });
      }
    });

    const mergedCart = Array.from(mergedStateMap.values());
    await pushCartToSupabase(userId, mergedCart);
    return mergedCart;
  } catch (error) {
    console.error("Failed to sync cart", error);
    return localCartState;
  }
}
