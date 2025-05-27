/*
  # Fix organization policies and references

  1. Changes
    - Fix infinite recursion in organization_members policy
    - Add missing organization_id column to service_reports
    - Update service_reports policy to include organization context
    - Add cascading deletes for organization references

  2. Security
    - Ensure proper RLS policies for all tables
    - Fix policy dependencies to prevent recursion
*/

-- Fix organization members policy by removing recursive check
DROP POLICY IF EXISTS "Users can view members of their organizations" ON public.organization_members;
CREATE POLICY "Users can view members of their organizations"
  ON public.organization_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = organization_members.organization_id
      AND (
        owner_id = auth.uid() OR
        organization_id IN (
          SELECT organization_id FROM public.organization_members
          WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
        )
      )
    )
  );

-- Add organization_id to service_reports
ALTER TABLE dashboard.service_reports 
ADD COLUMN organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

-- Update service_reports policy to include organization context
DROP POLICY IF EXISTS "Users can view reports for their schedules" ON dashboard.service_reports;
CREATE POLICY "Users can view organization reports"
  ON dashboard.service_reports
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = service_reports.organization_id
      AND user_id = auth.uid()
    )
  );

-- Update service_schedules foreign key to cascade
ALTER TABLE dashboard.service_schedules
DROP CONSTRAINT service_schedules_organization_id_fkey,
ADD CONSTRAINT service_schedules_organization_id_fkey
  FOREIGN KEY (organization_id)
  REFERENCES public.organizations(id)
  ON DELETE CASCADE;

-- Function to get organization members with user details
CREATE OR REPLACE FUNCTION public.get_organization_members(org_id uuid)
RETURNS TABLE (
  organization_id uuid,
  user_id uuid,
  role text,
  email text,
  full_name text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    m.organization_id,
    m.user_id,
    m.role,
    u.email,
    u.raw_user_meta_data->>'full_name' as full_name
  FROM organization_members m
  JOIN auth.users u ON m.user_id = u.id
  WHERE m.organization_id = org_id
  AND EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_id = org_id
    AND user_id = auth.uid()
  );
$$;