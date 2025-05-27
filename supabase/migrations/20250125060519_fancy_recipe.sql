/*
  # Multi-tenant Dashboard System

  1. New Tables
    - `organizations`
      - Organization/client dashboard that can have multiple users
      - Stores organization details and settings
    
    - `organization_members`
      - Junction table for users and organizations
      - Stores role/permissions for each user in an organization

  2. Security
    - Enable RLS on all tables
    - Add policies for organization access and member management
    - Ensure users can only access organizations they belong to

  3. Changes
    - Add organization context to existing service schedules and reports
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  owner_id uuid REFERENCES auth.users(id) NOT NULL,
  settings jsonb DEFAULT '{}'::jsonb
);

-- Create organization members table
CREATE TABLE IF NOT EXISTS public.organization_members (
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (organization_id, user_id)
);

-- Add organization_id to service_schedules
ALTER TABLE dashboard.service_schedules 
ADD COLUMN organization_id uuid REFERENCES public.organizations(id);

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Users can view organizations they belong to"
  ON public.organizations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = organizations.id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Owners can update their organizations"
  ON public.organizations
  FOR UPDATE
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (owner_id = auth.uid());

-- Organization members policies
CREATE POLICY "Users can view members of their organizations"
  ON public.organization_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = organization_members.organization_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Owners and admins can manage members"
  ON public.organization_members
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = organization_members.organization_id
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- Update service schedules policy to include organization context
DROP POLICY IF EXISTS "Users can view own schedules" ON dashboard.service_schedules;
CREATE POLICY "Users can view organization schedules"
  ON dashboard.service_schedules
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = service_schedules.organization_id
      AND user_id = auth.uid()
    )
  );

-- Functions for organization management
CREATE OR REPLACE FUNCTION public.create_organization(
  name text,
  settings jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  org_id uuid;
BEGIN
  -- Create organization
  INSERT INTO public.organizations (name, owner_id, settings)
  VALUES (name, auth.uid(), settings)
  RETURNING id INTO org_id;

  -- Add owner as member
  INSERT INTO public.organization_members (organization_id, user_id, role)
  VALUES (org_id, auth.uid(), 'owner');

  RETURN org_id;
END;
$$;

-- Function to add member to organization
CREATE OR REPLACE FUNCTION public.add_organization_member(
  org_id uuid,
  user_email text,
  role text DEFAULT 'member'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Check if caller has permission
  IF NOT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = org_id
    AND user_id = auth.uid()
    AND role IN ('owner', 'admin')
  ) THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;

  -- Get user ID from email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Add member
  INSERT INTO public.organization_members (organization_id, user_id, role)
  VALUES (org_id, target_user_id, role)
  ON CONFLICT (organization_id, user_id) 
  DO UPDATE SET role = EXCLUDED.role;

  RETURN true;
END;
$$;