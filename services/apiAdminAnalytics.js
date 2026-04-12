import { supabase } from "@/lib/supabase";

export async function getAdminKpis() {
  const { data, error } = await supabase.rpc("get_admin_kpis");
  if (error) {
    console.error("Error fetching admin KPIs:", error);
    throw new Error("Could not fetch KPIs");
  }
  return data;
}

export async function getDailyRevenue(days = 30) {
  const { data, error } = await supabase.rpc("get_daily_revenue", { days });
  if (error) throw new Error("Could not fetch daily revenue");
  return data;
}

export async function getCategoryRevenue() {
  const { data, error } = await supabase.rpc("get_category_revenue");
  if (error) throw new Error("Could not fetch category revenue");
  return data;
}
