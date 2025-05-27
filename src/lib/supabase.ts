import { createClient } from '@supabase/supabase-js';
import { setupCache } from './cache';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Configure request caching
setupCache();

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'dustbeaters_auth',
    storage: window.localStorage
  },
  global: {
    headers: {
      'Cache-Control': 'public, max-age=600'
    }
  }
});