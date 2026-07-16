// /utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  (process.env.SUPABASE_ID ? `https://${process.env.SUPABASE_ID}.supabase.co` : "");
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_API_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase env vars. Set SUPABASE_ID or SUPABASE_URL, plus SUPABASE_API_KEY. Legacy NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are also supported."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
