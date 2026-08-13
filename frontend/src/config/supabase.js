import { createClient } from '@supabase/supabase-js';

// Supabase Project Credentials (Replace placeholder keys with your Supabase Project URL & Anon Key)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
