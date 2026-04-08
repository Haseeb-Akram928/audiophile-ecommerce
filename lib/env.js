export const config = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  WELCOME_EMAIL_TEMPLATE_ID: import.meta.env.VITE_WELCOME_EMAIL_TEMPLATE_ID,
};

const missingKeys = Object.entries(config)
  .filter(([_, value]) => value === undefined || value === "")
  .map(([key]) => key);

if (missingKeys.length > 0) {
  console.warn(`Missing environment variables: ${missingKeys.join(", ")}`);
  
  if (missingKeys.includes("SUPABASE_URL") || missingKeys.includes("SUPABASE_ANON_KEY")) {
    throw new Error(`CRITICAL: Missing Supabase environment variables.`);
  }
}
