import { supabase } from "@/lib/supabase";

export async function getAdminUsers() {
  const { data, error } = await supabase.rpc("get_admin_all_users");
  
  if (error) {
    console.error("Error fetching admin users:", error);
    throw new Error("Could not fetch user list");
  }

  return data;
}

export async function promoteUserToAdmin({ userId, role, adminId }) {
  // Insert or update role in admin_roles
  const { data, error } = await supabase
    .from("admin_roles")
    .upsert(
      { user_id: userId, role: role },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (error) {
    console.error("Error promoting user:", error);
    throw new Error("Could not assign admin role");
  }

  // Log activity
  if (adminId) {
    await supabase.from("admin_activity_log").insert({
      user_id: adminId,
      action: "user.promote",
      entity_type: "user",
      entity_id: userId,
      metadata: { new_role: role },
    });
  }

  return data;
}

export async function removeAdminRole({ userId, adminId }) {
  const { error } = await supabase
    .from("admin_roles")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error removing admin role:", error);
    throw new Error("Could not revoke admin privileges");
  }

  if (adminId) {
    await supabase.from("admin_activity_log").insert({
      user_id: adminId,
      action: "user.demote",
      entity_type: "user",
      entity_id: userId,
    });
  }

  return true;
}
