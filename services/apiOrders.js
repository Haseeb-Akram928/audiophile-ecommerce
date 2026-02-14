import { supabase } from "@/lib/supabase";

export async function createOrder(order) {
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        ...order,
        // You might want to add user_id here if the user is authenticated
      },
    ])
    .select();

  if (orderError) {
    console.error(orderError);
    throw new Error("Order could not be created");
  }

  const orderId = orderData[0].id;
  const orderItems = order.cart.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error(itemsError);
    // You might want to delete the order here if items fail to insert
    throw new Error("Order items could not be created");
  }

  return orderData[0];
}
