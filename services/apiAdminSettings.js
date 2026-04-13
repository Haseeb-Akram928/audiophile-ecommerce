import { supabase } from "@/lib/supabase";

export async function getActivityLogs() {
  const { data, error } = await supabase
    .from("admin_activity_log")
    .select(`*, profiles:user_id(username)`)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching activity logs:", error);
    throw new Error("Could not fetch activity logs");
  }

  return data;
}
