import { supabase } from "@/lib/supabase";
import { incrementCouponUsage } from "./apiCoupons";

export async function createOrder({
  userId,
  cartItems,
  shippingAddress,
  paymentMethod,
  totalAmount,
  couponId,
}) {
  try {
    // 1. Create the order
    const orderData = {
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      coupon_id: couponId,
    };

    if (userId) {
      orderData.user_id = userId;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error("Supabase order creation error:", orderError);
      throw new Error(`Order could not be created: ${orderError.message}`);
    }

    // 2. Create order items
    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.productId, // Assuming cart item has productId
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      console.error("Supabase order items creation error:", orderItemsError);
      throw new Error("Could not create order items.");
    }

    // 3. Increment coupon usage if applied
    if (couponId) {
      await incrementCouponUsage(couponId);
    }

    return { status: "success", orderId: order.id };
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function getOrders(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        products (
          name,
          image,
          slug
        )
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase order fetching error:", error);
    throw new Error("Could not fetch orders.");
  }

  return data;
}
