/**
 * API client wrapper for Supabase queries
 * Provides typed methods for database operations with error handling
 */
/**
 * Base API response type
 */
export interface APIResponse<T> {
  data: T | null;
  error: Error | null;
}
/**
 * API Client class with typed methods
 */
export declare class APIClient {
  /**
   * Get current user profile
   */
  getUserProfile(userId: string): Promise<APIResponse<unknown>>;
  /**
   * Update user profile
   */
  updateUserProfile(
    userId: string,
    updates: Record<string, unknown>
  ): Promise<APIResponse<unknown>>;
  /**
   * Update user preferences
   */
  updateUserPreferences(
    userId: string,
    preferences: Record<string, unknown>
  ): Promise<APIResponse<unknown>>;
}
export declare const apiClient: APIClient;
//# sourceMappingURL=api-client.d.ts.map
