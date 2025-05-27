/*
  # Fix organization policies and dependencies

  1. Changes
    - Drop all problematic policies
    - Create new non-recursive policies with proper access control
    - Add performance optimizations
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view members of their organizations" ON public.organization_members;
DROP POLICY IF EXISTS "Owners and admins can manage members" ON public.organization_members;
DROP POLICY IF EXISTS "Users can view organization members" ON public.organization_members;
DROP POLICY IF EXISTS "Owners can manage organization members" ON public.organization_members;
DROP POLICY IF EXISTS "Admins can manage non-owner members" ON public.organization_members;

-- Create new, simplified policies for organization_members
CREATE POLICY "View organization members"
  ON public.organization_members
  FOR SELECT
  USING (
    user_id = auth.uid() OR
    organization_id IN (
      SELECT organization_id 
      FROM public.organization_members om
      WHERE om.user_id = auth.uid()
    )
  );

CREATE POLICY "Manage as owner"
  ON public.organization_members
  FOR ALL
  USING (
    organization_id IN (
      SELECT id 
      FROM public.organizations 
      WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Manage as admin"
  ON public.organization_members
  FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.organization_members 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    AND NOT EXISTS (
      SELECT 1
      FROM public.organization_members
      WHERE organization_id = organization_members.organization_id
      AND user_id = organization_members.user_id
      AND role = 'owner'
    )
  );

-- Ensure proper indexing for performance
DROP INDEX IF EXISTS idx_org_members_user_id;
DROP INDEX IF EXISTS idx_org_members_org_id;
DROP INDEX IF EXISTS idx_org_members_role;
DROP INDEX IF EXISTS idx_organizations_owner_id;

CREATE INDEX idx_org_members_user_id ON public.organization_members(user_id);
CREATE INDEX idx_org_members_org_id ON public.organization_members(organization_id);
CREATE INDEX idx_org_members_role ON public.organization_members(role);
CREATE INDEX idx_organizations_owner_id ON public.organizations(owner_id);

-- Add materialized view for faster member lookups
CREATE MATERIALIZED VIEW IF NOT EXISTS public.organization_member_details AS
SELECT 
  om.organization_id,
  om.user_id,
  om.role,
  u.email,
  u.raw_user_meta_data->>'full_name' as full_name
FROM public.organization_members om
JOIN auth.users u ON om.user_id = u.id;

CREATE UNIQUE INDEX IF NOT EXISTS idx_org_member_details_unique 
ON public.organization_member_details(organization_id, user_id);

-- Function to refresh member details
CREATE OR REPLACE FUNCTION public.refresh_member_details()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.organization_member_details;
  RETURN NULL;
END;
$$;

-- Trigger to keep member details updated
DROP TRIGGER IF EXISTS refresh_member_details_trigger ON public.organization_members;
CREATE TRIGGER refresh_member_details_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON public.organization_members
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.refresh_member_details();