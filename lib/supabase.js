import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ffjmbbpteojoephvtlsw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmam1iYnB0ZW9qb2VwaHZ0bHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjk3ODgsImV4cCI6MjA4NjIwNTc4OH0.M64gHWXewYgP1BgNhEri4x9xu23qVpg7HN0corL6PXQ";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
