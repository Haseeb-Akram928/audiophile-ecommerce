import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ffjmbbpteojoephvtlsw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmam1iYnB0ZW9qb2VwaHZ0bHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjk3ODgsImV4cCI6MjA4NjIwNTc4OH0.M64gHWXewYgP1BgNhEri4x9xu23qVpg7HN0corL6PXQ"
);

// Tables we know about from the codebase
const tables = [
  "products",
  "orders",
  "order_items",
  "profiles",
  "wishlists",
  "user_carts",
];

async function inspectTable(tableName) {
  // Fetch 1 row to see columns and types
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .limit(1);

  if (error) {
    console.log(`\n❌ TABLE: ${tableName}`);
    console.log(`   Error: ${error.message} (code: ${error.code})`);
    return;
  }

  console.log(`\n✅ TABLE: ${tableName}`);
  if (data && data.length > 0) {
    const columns = Object.keys(data[0]);
    console.log(`   Columns (${columns.length}):`);
    columns.forEach((col) => {
      const val = data[0][col];
      const type = val === null ? "null" : typeof val;
      const preview =
        val === null
          ? "NULL"
          : typeof val === "object"
            ? JSON.stringify(val).substring(0, 80)
            : String(val).substring(0, 80);
      console.log(`     - ${col}: [${type}] = ${preview}`);
    });
  } else {
    console.log("   (empty table — no rows to infer columns from)");
  }

  // Also try to get count
  const { count, error: countErr } = await supabase
    .from(tableName)
    .select("*", { count: "exact", head: true });

  if (!countErr) {
    console.log(`   Row count: ${count}`);
  }
}

// Also try to discover any other tables by querying common ones
const extraTables = [
  "categories",
  "admin_roles",
  "admin_activity_log",
  "product_reviews",
  "reviews",
  "coupons",
  "site_settings",
  "addresses",
  "shipping_addresses",
];

console.log("═══════════════════════════════════════════");
console.log("  AUDIOPHILE SUPABASE SCHEMA INSPECTION");
console.log("═══════════════════════════════════════════");

console.log("\n--- KNOWN TABLES (from codebase) ---");
for (const t of tables) {
  await inspectTable(t);
}

console.log("\n\n--- PROBING ADDITIONAL TABLES ---");
for (const t of extraTables) {
  await inspectTable(t);
}

// Check storage buckets
console.log("\n\n--- STORAGE BUCKETS ---");
const { data: buckets, error: bucketsErr } = await supabase.storage.listBuckets();
if (bucketsErr) {
  console.log(`   Error listing buckets: ${bucketsErr.message}`);
} else if (buckets) {
  buckets.forEach((b) => {
    console.log(`   📦 ${b.name} (public: ${b.public}, created: ${b.created_at})`);
  });
} else {
  console.log("   No buckets found or no access");
}

console.log("\n═══════════════════════════════════════════");
console.log("  INSPECTION COMPLETE");
console.log("═══════════════════════════════════════════");
