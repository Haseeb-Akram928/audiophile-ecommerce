import { supabase } from "@/lib/supabase";

export async function getAdminOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`*, profiles(username, avatar_url)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin orders", error);
    throw new Error("Orders could not be loaded");
  }

  return data;
}

export async function getAdminOrderDetails(id) {
  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items(*, products(name, image, slug)), profiles(username, avatar_url)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order details", error);
    throw new Error("Order details could not be loaded");
  }

  return data;
}

export async function updateOrderStatus({ id, status, adminId }) {
  // 1. Fetch current status
  const { data: currOrder, error: currErr } = await supabase
    .from("orders")
    .select("status")
    .eq("id", id)
    .single();

  if (currErr) throw new Error("Could not check current order status");

  // 2. Update status
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status", error);
    throw new Error("Order status could not be updated");
  }

  // 3. Log to activity
  if (adminId) {
    await supabase.from("admin_activity_log").insert({
      user_id: adminId,
      action: "order.update_status",
      entity_type: "order",
      entity_id: id,
      metadata: { old_status: currOrder.status, new_status: status },
    });
  }

  return data;
}
