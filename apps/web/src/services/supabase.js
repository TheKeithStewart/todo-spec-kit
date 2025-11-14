import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}
/**
 * Supabase client instance with TypeScript types
 * Configured for browser-based authentication with auto-refresh
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    flowType: 'pkce', // Use PKCE flow for enhanced security
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'X-Client-Info': 'stackday-web',
    },
  },
});
/**
 * Helper to check if user is authenticated
 */
export async function isAuthenticated() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
}
/**
 * Helper to get current user
 */
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
/**
 * Helper to sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
//# sourceMappingURL=supabase.js.map
