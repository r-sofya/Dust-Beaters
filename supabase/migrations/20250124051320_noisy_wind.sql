/*
  # Create Dashboard Schema and Tables

  1. New Schema
    - Creates a dedicated `dashboard` schema for all cleaning service management tables

  2. New Tables
    - `dashboard.service_schedules`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references profiles)
      - `service_type` (text)
      - `frequency` (text)
      - `next_service_date` (timestamptz)
      - `status` (text)
      - `notes` (text)
      - Timestamps for auditing

    - `dashboard.service_reports`
      - `id` (uuid, primary key)
      - `schedule_id` (uuid, references service_schedules)
      - `completed_at` (timestamptz)
      - `cleaner_notes` (text)
      - `client_feedback` (text)
      - `rating` (integer, 1-5)
      - Timestamps for auditing

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create dashboard schema
CREATE SCHEMA IF NOT EXISTS dashboard;

-- Service Schedules Table
CREATE TABLE IF NOT EXISTS dashboard.service_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.profiles(id) NOT NULL,
  service_type text NOT NULL,
  frequency text NOT NULL,
  next_service_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Reports Table
CREATE TABLE IF NOT EXISTS dashboard.service_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id uuid REFERENCES dashboard.service_schedules(id) NOT NULL,
  completed_at timestamptz NOT NULL,
  cleaner_notes text,
  client_feedback text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE dashboard.service_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard.service_reports ENABLE ROW LEVEL SECURITY;

-- Policies for service_schedules
CREATE POLICY "Users can view own schedules"
  ON dashboard.service_schedules
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Users can insert own schedules"
  ON dashboard.service_schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Users can update own schedules"
  ON dashboard.service_schedules
  FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid());

-- Policies for service_reports
CREATE POLICY "Users can view reports for their schedules"
  ON dashboard.service_reports
  FOR SELECT
  TO authenticated
  USING (
    schedule_id IN (
      SELECT id FROM dashboard.service_schedules
      WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Users can provide feedback on their reports"
  ON dashboard.service_reports
  FOR UPDATE
  TO authenticated
  USING (
    schedule_id IN (
      SELECT id FROM dashboard.service_schedules
      WHERE client_id = auth.uid()
    )
  )
  WITH CHECK (
    schedule_id IN (
      SELECT id FROM dashboard.service_schedules
      WHERE client_id = auth.uid()
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION dashboard.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add updated_at triggers
CREATE TRIGGER handle_schedules_updated_at
  BEFORE UPDATE ON dashboard.service_schedules
  FOR EACH ROW
  EXECUTE FUNCTION dashboard.handle_updated_at();

CREATE TRIGGER handle_reports_updated_at
  BEFORE UPDATE ON dashboard.service_reports
  FOR EACH ROW
  EXECUTE FUNCTION dashboard.handle_updated_at();