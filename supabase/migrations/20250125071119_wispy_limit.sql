/*
  # Fix organization policies and dependencies

  1. Changes
    - Drop problematic policies
    - Create new non-recursive policies
    - Clean up organization-related tables
*/

-- Drop problematic policies first
DROP POLICY IF EXISTS "Users can view members of their organizations" ON public.organization_members;
DROP POLICY IF EXISTS "Owners and admins can manage members" ON public.organization_members;

-- Create new, simplified policies for organization_members
CREATE POLICY "Users can view organization members"
  ON public.organization_members
  FOR SELECT
  USING (
    user_id = auth.uid() OR
    organization_id IN (
      SELECT organization_id 
      FROM public.organization_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Owners can manage organization members"
  ON public.organization_members
  FOR ALL
  USING (
    organization_id IN (
      SELECT id 
      FROM public.organizations 
      WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage non-owner members"
  ON public.organization_members
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 
      FROM public.organization_members 
      WHERE organization_id = organization_members.organization_id
      AND user_id = auth.uid() 
      AND role = 'admin'
    )
    AND (
      SELECT role 
      FROM public.organization_members 
      WHERE organization_id = organization_members.organization_id
      AND user_id = organization_members.user_id
    ) != 'owner'
  );

-- Clean up any orphaned records
DELETE FROM public.organization_members
WHERE organization_id NOT IN (SELECT id FROM public.organizations);

-- Add indexes to improve query performance
CREATE INDEX IF NOT EXISTS idx_org_members_user_id ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org_id ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_organizations_owner_id ON public.organizations(owner_id);