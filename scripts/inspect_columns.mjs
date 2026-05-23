import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ffjmbbpteojoephvtlsw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmam1iYnB0ZW9qb2VwaHZ0bHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjk3ODgsImV4cCI6MjA4NjIwNTc4OH0.M64gHWXewYgP1BgNhEri4x9xu23qVpg7HN0corL6PXQ"
);

// Query information_schema to get real column definitions
const { data, error } = await supabase.rpc("get_table_columns_info", {});

// If the RPC doesn't exist, try direct SQL via a raw query workaround
// We'll query each table with LIMIT 0 and look at response headers
const tables = ["products", "orders", "order_items", "profiles", "wishlists", "user_carts"];
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmam1iYnB0ZW9qb2VwaHZ0bHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjk3ODgsImV4cCI6MjA4NjIwNTc4OH0.M64gHWXewYgP1BgNhEri4x9xu23qVpg7HN0corL6PXQ";
const baseUrl = "https://ffjmbbpteojoephvtlsw.supabase.co/rest/v1";

console.log("═══════════════════════════════════════════");
console.log("  SCHEMA INSPECTION VIA OPTIONS + COLUMNS");
console.log("═══════════════════════════════════════════\n");

for (const table of tables) {
  // Use OPTIONS request to get column info
  const optResp = await fetch(`${baseUrl}/${table}`, {
    method: "OPTIONS",
    headers: {
      apikey,
      "Content-Profile": "public",
    },
  });

  // Also do a GET with select=* and Prefer: count=exact to get columns from header
  const getResp = await fetch(`${baseUrl}/${table}?select=*&limit=0`, {
    headers: {
      apikey,
      Authorization: `Bearer ${apikey}`,
      Prefer: "count=exact",
    },
  });

  // The Content-Type header from OPTIONS might have column info
  // Let's also try HEAD
  const headResp = await fetch(`${baseUrl}/${table}?select=*&limit=0`, {
    method: "HEAD",
    headers: {
      apikey,
      Authorization: `Bearer ${apikey}`,
    },
  });

  console.log(`\n📋 TABLE: ${table}`);
  console.log(`   OPTIONS status: ${optResp.status}`);
  
  // Try to get column info from the OPTIONS response
  const optBody = await optResp.text();
  if (optBody) {
    try {
      const optJson = JSON.parse(optBody);
      if (optJson.columns || optJson.definitions) {
        console.log(`   Columns from OPTIONS:`, JSON.stringify(optJson, null, 2));
      }
    } catch {}
  }

  // Check Content-Range header for count
  const range = getResp.headers.get("content-range");
  if (range) {
    console.log(`   Content-Range: ${range}`);
  }
}

// Try to create a temporary insert to see what columns are accepted/rejected
// by doing a dry run insert with garbage data (will fail but error reveals column names)
console.log("\n\n═══════════════════════════════════════════");
console.log("  COLUMN DISCOVERY VIA INSERT ERRORS");
console.log("═══════════════════════════════════════════\n");

for (const table of ["orders", "order_items"]) {
  const { data, error } = await supabase
    .from(table)
    .insert({ _dummy_: "test" })
    .select();

  console.log(`\n📋 TABLE: ${table}`);
  if (error) {
    console.log(`   Error: ${error.message}`);
    console.log(`   Details: ${error.details}`);
    console.log(`   Hint: ${error.hint}`);
    console.log(`   Code: ${error.code}`);
  }
}

// Final approach: Use the OpenAPI endpoint properly
console.log("\n\n═══════════════════════════════════════════");
console.log("  OPENAPI SPEC (FULL)");
console.log("═══════════════════════════════════════════\n");

const specResp = await fetch(`${baseUrl}/`, {
  headers: {
    apikey,
    Accept: "application/json",
  },
});

const specData = await specResp.json();
// The OpenAPI spec for PostgREST v10+ is at the root
if (specData.paths) {
  const tableNames = Object.keys(specData.paths);
  console.log("Tables/Views found:", tableNames);
  
  const defs = specData.definitions || {};
  for (const [name, def] of Object.entries(defs)) {
    console.log(`\n📋 DEFINITION: ${name}`);
    const props = def.properties || {};
    for (const [col, spec] of Object.entries(props)) {
      console.log(`     - ${col}: type=${spec.type || "?"} format=${spec.format || "?"} description="${spec.description || ""}" default=${spec.default !== undefined ? JSON.stringify(spec.default) : "none"} enum=${spec.enum ? JSON.stringify(spec.enum) : "none"}`);
    }
    if (def.required) {
      console.log(`   REQUIRED: [${def.required.join(", ")}]`);
    }
  }
} else {
  console.log("No paths found. Raw response keys:", Object.keys(specData));
  // Print first 2000 chars of the response
  console.log(JSON.stringify(specData).substring(0, 3000));
}
