import { supabase } from "@/lib/supabase";

export async function getAdminRole(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("admin_roles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error("Error fetching admin role:", error.message);
    return null;
  }

  return data;
}
