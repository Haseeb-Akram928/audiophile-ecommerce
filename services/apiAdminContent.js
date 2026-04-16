import { supabase } from "@/lib/supabase";

// -- REVIEWS --
export async function getAdminReviews() {
  const { data, error } = await supabase
    .from("product_reviews")
    .select(`*, products(name), profiles(username)`)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not fetch reviews");
  return data;
}

export async function approveReview({ reviewId, isApproved, adminId }) {
  const { data, error } = await supabase
    .from("product_reviews")
    .update({ status: isApproved ? "approved" : "pending" })
    .eq("id", reviewId)
    .select()
    .single();

  if (error) throw new Error("Could not update review status");

  if (adminId) {
    await supabase.from("admin_activity_log").insert({
      user_id: adminId,
      action: "review.moderate",
      entity_type: "review",
      entity_id: reviewId,
      metadata: { is_approved: isApproved },
    });
  }

  return data;
}

// -- COUPONS --
export async function getAdminCoupons() {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not fetch coupons");
  return data;
}

export async function createCoupon(couponData) {
  const { data, error } = await supabase
    .from("coupons")
    .insert([couponData])
    .select()
    .single();

  if (error) throw new Error("Could not create coupon");
  return data;
}

export async function toggleCoupon({ couponId, isActive }) {
  const { data, error } = await supabase
    .from("coupons")
    .update({ is_active: isActive })
    .eq("id", couponId)
    .select()
    .single();

  if (error) throw new Error("Could not update coupon status");
  return data;
}

// -- SITE SETTINGS --
export async function getSiteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*");

  if (error) throw new Error("Could not fetch site settings");
  return data;
}

export async function updateSiteSetting({ settingKey, value, adminId }) {
  const { data, error } = await supabase
    .from("site_settings")
    .upsert({ 
      key: settingKey, 
      value, 
      updated_by: adminId, 
      updated_at: new Date().toISOString() 
    })
    .select()
    .single();

  if (error) throw new Error("Could not update site setting");
  return data;
}
