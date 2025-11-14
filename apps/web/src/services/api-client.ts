/**
 * API client wrapper for Supabase queries
 * Provides typed methods for database operations with error handling
 */

import { supabase } from './supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { logError, NetworkError, NotFoundError, ValidationError } from '@/utils/errors';

/**
 * Base API response type
 */
export interface APIResponse<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Handle Supabase errors and convert to app errors
 */
function handleSupabaseError(error: PostgrestError | null): Error | null {
  if (!error) return null;

  logError(error, { source: 'supabase' });

  // Map Supabase error codes to app errors
  switch (error.code) {
    case 'PGRST116': // Not found
      return new NotFoundError('Resource');
    case '23505': // Unique violation
      return new ValidationError('A record with this value already exists');
    case '23503': // Foreign key violation
      return new ValidationError('Referenced record does not exist');
    case '23502': // Not null violation
      return new ValidationError('Required field is missing');
    default:
      return new Error(error.message);
  }
}

/**
 * Generic query wrapper with error handling
 */
async function query<T>(
  operation: () => Promise<{ data: T | null; error: PostgrestError | null }>
): Promise<APIResponse<T>> {
  try {
    const { data, error } = await operation();

    if (error) {
      return {
        data: null,
        error: handleSupabaseError(error),
      };
    }

    return { data, error: null };
  } catch (err) {
    logError(err, { source: 'api-client' });
    return {
      data: null,
      error: new NetworkError('Request failed'),
    };
  }
}

/**
 * API Client class with typed methods
 */
export class APIClient {
  /**
   * Get current user profile
   */
  async getUserProfile(userId: string) {
    return query(() => supabase.from('users').select('*').eq('id', userId).single());
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: Record<string, unknown>) {
    return query(() => supabase.from('users').update(updates).eq('id', userId).select().single());
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(userId: string, preferences: Record<string, unknown>) {
    return query(() =>
      supabase.from('users').update({ preferences }).eq('id', userId).select().single()
    );
  }

  // Additional methods will be added as entities are implemented
  // Tasks, Projects, FocusBlocks, etc.
}

// Export singleton instance
export const apiClient = new APIClient();
