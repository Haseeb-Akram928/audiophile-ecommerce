import { supabase } from "@/lib/supabase";

export async function createOrder({
  userId,
  cartItems,
  shippingAddress,
  paymentMethod,
  totalAmount,
}) {
  try {
    // 1. Create the order
    const orderData = {
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
    };

    if (userId) {
      orderData.user_id = userId;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

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
      // Ideally, here you'd also want to roll back the order creation if order items fail.
      // Supabase's client-side library doesn't directly support transactions spanning multiple inserts
      // in a single call. For true transactional integrity across two different table inserts,
      // you'd typically need a stored procedure/database function in Supabase.
      // For now, we'll just throw an error.
      throw new Error("Could not create order items.");
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
