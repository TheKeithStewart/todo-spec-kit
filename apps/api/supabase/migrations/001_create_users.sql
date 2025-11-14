-- Migration: 001_create_users.sql
-- Purpose: Create User table with preferences and authentication setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create User table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- User preferences stored as JSONB for flexibility
  preferences JSONB NOT NULL DEFAULT '{
    "workHoursStart": "09:00",
    "workHoursEnd": "17:00",
    "breakDuration": 15,
    "morningRoutineEnabled": false,
    "morningRoutineDuration": 30,
    "eveningRoutineEnabled": false,
    "eveningRoutineDuration": 30,
    "timezone": "UTC",
    "weekStartDay": 1,
    "defaultTaskDuration": 30,
    "focusBlockMinDuration": 25,
    "focusBlockMaxDuration": 120,
    "autoScheduleEnabled": true,
    "notificationsEnabled": true
  }'::jsonb,

  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Users are created automatically on signup (handled by Supabase Auth trigger)
CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, preferences)
  VALUES (
    NEW.id,
    NEW.email,
    '{
      "workHoursStart": "09:00",
      "workHoursEnd": "17:00",
      "breakDuration": 15,
      "morningRoutineEnabled": false,
      "morningRoutineDuration": 30,
      "eveningRoutineEnabled": false,
      "eveningRoutineDuration": 30,
      "timezone": "UTC",
      "weekStartDay": 1,
      "defaultTaskDuration": 30,
      "focusBlockMinDuration": 25,
      "focusBlockMaxDuration": 120,
      "autoScheduleEnabled": true,
      "notificationsEnabled": true
    }'::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile automatically on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Comments for documentation
COMMENT ON TABLE users IS 'User profiles with preferences for StackDay platform';
COMMENT ON COLUMN users.preferences IS 'User preferences stored as JSONB for flexible configuration';
