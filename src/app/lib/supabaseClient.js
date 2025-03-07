import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPA_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPA_ANON;

export const supabase = createClient(supabaseURL, supabaseKey);
