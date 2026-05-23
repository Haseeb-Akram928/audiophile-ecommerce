import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testQuery() {
  console.log("Testing order details query...");
  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items(*, products(name, image, slug)), profiles(username, avatar_url)`)
    .limit(1);

  if (error) {
    console.error("ERROR:", error.message, error.hint, error.details);
  } else {
    console.log("DATA length:", data.length);
    console.log("FIRST ROW:", JSON.stringify(data[0] || {}, null, 2));
  }
}

testQuery();
