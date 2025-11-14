/**
 * Database type definitions generated from Supabase schema
 * This file provides TypeScript types for all database tables
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          preferences: UserPreferences;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          preferences?: UserPreferences;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
          preferences?: UserPreferences;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export interface UserPreferences {
  workHoursStart: string;
  workHoursEnd: string;
  breakDuration: number;
  morningRoutineEnabled: boolean;
  morningRoutineDuration: number;
  eveningRoutineEnabled: boolean;
  eveningRoutineDuration: number;
  timezone: string;
  weekStartDay: number;
  defaultTaskDuration: number;
  focusBlockMinDuration: number;
  focusBlockMaxDuration: number;
  autoScheduleEnabled: boolean;
  notificationsEnabled: boolean;
}
