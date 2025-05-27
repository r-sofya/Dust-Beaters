/*
  # Create cleaning services tables

  1. New Tables
    - `service_schedules`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references profiles)
      - `service_type` (text)
      - `frequency` (text)
      - `next_service_date` (timestamptz)
      - `status` (text)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `service_reports`
      - `id` (uuid, primary key)
      - `schedule_id` (uuid, references service_schedules)
      - `completed_at` (timestamptz)
      - `cleaner_notes` (text)
      - `client_feedback` (text)
      - `rating` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create service_schedules table
CREATE TABLE IF NOT EXISTS service_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) NOT NULL,
  service_type text NOT NULL,
  frequency text NOT NULL,
  next_service_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create service_reports table
CREATE TABLE IF NOT EXISTS service_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id uuid REFERENCES service_schedules(id) NOT NULL,
  completed_at timestamptz NOT NULL,
  cleaner_notes text,
  client_feedback text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE service_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_reports ENABLE ROW LEVEL SECURITY;

-- Policies for service_schedules
CREATE POLICY "Users can view own schedules"
  ON service_schedules
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Users can insert own schedules"
  ON service_schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Users can update own schedules"
  ON service_schedules
  FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid());

-- Policies for service_reports
CREATE POLICY "Users can view reports for own schedules"
  ON service_reports
  FOR SELECT
  TO authenticated
  USING (
    schedule_id IN (
      SELECT id FROM service_schedules WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Users can provide feedback on own reports"
  ON service_reports
  FOR UPDATE
  TO authenticated
  USING (
    schedule_id IN (
      SELECT id FROM service_schedules WHERE client_id = auth.uid()
    )
  )
  WITH CHECK (
    schedule_id IN (
      SELECT id FROM service_schedules WHERE client_id = auth.uid()
    )
  );