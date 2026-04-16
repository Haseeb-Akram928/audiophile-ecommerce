import { supabase } from "@/lib/supabase";

export async function validateCoupon(code) {
  const { data: coupon, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("is_active", true)
    .single();

  if (error || !coupon) {
    throw new Error("Invalid coupon code");
  }

  // Check if expired
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    throw new Error("Coupon has expired");
  }

  // Check usage limit
  if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
    throw new Error("Coupon usage limit reached");
  }

  return coupon;
}

export async function incrementCouponUsage(couponId) {
  // In a real application, this should be done in a database transaction or RPC
  // but for simplicity here we just do a select-then-update or just increment
  const { data: coupon, error: fetchError } = await supabase
    .from("coupons")
    .select("current_uses")
    .eq("id", couponId)
    .single();

  if (fetchError) return;

  await supabase
    .from("coupons")
    .update({ current_uses: coupon.current_uses + 1 })
    .eq("id", couponId);
}
