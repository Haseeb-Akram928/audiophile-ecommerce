import { createClient } from "@supabase/supabase-js";
import { config } from "./env.js";

const supabaseUrl = config.SUPABASE_URL;
const supabaseAnonKey = config.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
