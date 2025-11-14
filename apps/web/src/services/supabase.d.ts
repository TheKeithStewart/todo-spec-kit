import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@stackday/shared-types';
/**
 * Supabase client instance with TypeScript types
 * Configured for browser-based authentication with auto-refresh
 */
export declare const supabase: SupabaseClient<Database>;
/**
 * Helper to check if user is authenticated
 */
export declare function isAuthenticated(): Promise<boolean>;
/**
 * Helper to get current user
 */
export declare function getCurrentUser(): Promise<import('@supabase/supabase-js').AuthUser | null>;
/**
 * Helper to sign out
 */
export declare function signOut(): Promise<void>;
//# sourceMappingURL=supabase.d.ts.map
