import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('Supabase URL is missing. Auth features will be disabled. Set VITE_SUPABASE_URL in .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
