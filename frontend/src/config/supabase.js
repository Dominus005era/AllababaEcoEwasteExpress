import { createClient } from '@supabase/supabase-js';

// EcoTrace Live Production Supabase Project Credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://loplantrmjpjptgvjylr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_IscXxPeVKr3K2rO3L83zzw_OKRtLkMO';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
