import { supabase } from "@/lib/supabase";

export async function getProductReviews(productId) {
  const { data, error } = await supabase
    .from("product_reviews")
    .select(`
      *,
      profiles(username, avatar_url)
    `)
    .eq("product_id", productId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Reviews could not be loaded");
  }

  return data;
}

export async function createReview({ productId, userId, rating, comment, title }) {
  const { data, error } = await supabase
    .from("product_reviews")
    .insert([
      {
        product_id: productId,
        user_id: userId,
        rating,
        body: comment,
        title: title || "",
        status: "pending"
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating review:", error);
    if (error.code === '23505') {
      throw new Error("You have already reviewed this product.");
    }
    throw new Error("Review could not be submitted");
  }

  return data;
}
