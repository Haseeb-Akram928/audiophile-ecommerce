import { supabase } from "@/lib/supabase";

export async function getWishlist(userId) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("wishlists")
    .select("product_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data.map((item) => item.product_id);
}

export async function toggleWishlistItem({ userId, productId, isWishlisted }) {
  if (isWishlisted) {
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("wishlists")
      .insert([{ user_id: userId, product_id: productId }]);
    if (error) throw new Error(error.message);
  }
}
