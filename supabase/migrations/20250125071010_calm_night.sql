/*
  # Fix organization dependencies

  1. Changes
    - Drop existing policies that depend on organization_id
    - Remove organization_id column from service_schedules
    - Create new policies using client_id
*/

-- First drop the dependent policy
DROP POLICY IF EXISTS "Users can view organization schedules" ON dashboard.service_schedules;

-- Now we can safely drop the column
ALTER TABLE dashboard.service_schedules 
DROP COLUMN IF EXISTS organization_id;

-- Create new policy using client_id
CREATE POLICY "Users can view own schedules"
  ON dashboard.service_schedules
  FOR SELECT
  USING (client_id = auth.uid());

-- Update service reports policy
DROP POLICY IF EXISTS "Users can view organization reports" ON dashboard.service_reports;
CREATE POLICY "Users can view own reports"
  ON dashboard.service_reports
  FOR SELECT
  USING (
    schedule_id IN (
      SELECT id FROM dashboard.service_schedules
      WHERE client_id = auth.uid()
    )
  );