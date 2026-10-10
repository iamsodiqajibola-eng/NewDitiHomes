import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

console.log("Supabase URL loaded:", Boolean(supabaseUrl));
console.log("Supabase key loaded:", Boolean(supabasePublishableKey));

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Supabase environment variables are missing. Check the root .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
