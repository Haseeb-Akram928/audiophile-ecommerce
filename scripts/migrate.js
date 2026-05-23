import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Supabase credentials (replace with your actual project URL and anon key or use environment variables)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateData() {
  try {
    // Read data.json
    const dataPath = path.resolve(process.cwd(), "data.json");
    const jsonData = await fs.readFile(dataPath, "utf-8");
    const products = JSON.parse(jsonData);

    console.log("Starting data migration to Supabase...");

    // Clear existing data (optional, useful for fresh migrations)
    // await supabase.from('products').delete().neq('id', 0); // Deletes all rows where id is not 0

    for (const product of products) {
      const { data, error } = await supabase.from("products").insert([product]);

      if (error) {
        console.error(`Error inserting product ${product.name}:`, error);
      } else {
        console.log(`Successfully inserted product: ${product.name}`);
      }
    }

    console.log("Data migration complete!");
  } catch (error) {
    console.error("An error occurred during migration:", error);
  }
}

migrateData();
