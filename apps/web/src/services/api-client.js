/**
 * API client wrapper for Supabase queries
 * Provides typed methods for database operations with error handling
 */
import { supabase } from './supabase';
import { logError, NetworkError, NotFoundError, ValidationError } from '@/utils/errors';
/**
 * Handle Supabase errors and convert to app errors
 */
function handleSupabaseError(error) {
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
async function query(operation) {
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
  async getUserProfile(userId) {
    return query(() => supabase.from('users').select('*').eq('id', userId).single());
  }
  /**
   * Update user profile
   */
  async updateUserProfile(userId, updates) {
    return query(() => supabase.from('users').update(updates).eq('id', userId).select().single());
  }
  /**
   * Update user preferences
   */
  async updateUserPreferences(userId, preferences) {
    return query(() =>
      supabase.from('users').update({ preferences }).eq('id', userId).select().single()
    );
  }
}
// Export singleton instance
export const apiClient = new APIClient();
//# sourceMappingURL=api-client.js.map
