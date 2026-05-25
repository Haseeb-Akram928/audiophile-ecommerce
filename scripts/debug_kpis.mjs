import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ffjmbbpteojoephvtlsw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmam1iYnB0ZW9qb2VwaHZ0bHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjk3ODgsImV4cCI6MjA4NjIwNTc4OH0.M64gHWXewYgP1BgNhEri4x9xu23qVpg7HN0corL6PXQ"
);

// Try to retrieve the function definition via pg_proc
async function getFunctionDef() {
  const { data, error } = await supabase.rpc("get_admin_kpis");
  console.log("get_admin_kpis → error:", JSON.stringify(error));
  console.log("get_admin_kpis → data:", data);

  // Try querying profiles directly to see what columns exist
  console.log("\n=== profiles table sample ===");
  const { data: profiles, error: pErr } = await supabase
    .from("profiles")
    .select("*")
    .limit(2);
  console.log("profiles error:", pErr);
  if (profiles?.length > 0) {
    console.log("profiles columns:", Object.keys(profiles[0]));
    console.log("sample:", JSON.stringify(profiles[0], null, 2));
  }

  // Check orders table - what columns are there
  console.log("\n=== orders table ===");
  const { data: orders, error: oErr } = await supabase
    .from("orders")
    .select("*")
    .limit(3);
  console.log("orders error:", oErr);
  console.log("orders count:", orders?.length);
  if (orders?.length > 0) {
    console.log("order columns:", Object.keys(orders[0]));
  } else {
    console.log("No orders found");
  }
  
  // Try pending orders
  const { data: pending } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");
  console.log("pending orders count:", pending);
}

getFunctionDef();
