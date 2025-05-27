/*
  # Fix Organization Member Policies

  1. Changes
    - Remove recursive policies
    - Simplify permission checks
    - Add efficient indexes
    - Create secure helper functions

  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Optimize query performance
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "View organization members" ON public.organization_members;
DROP POLICY IF EXISTS "Manage as owner" ON public.organization_members;
DROP POLICY IF EXISTS "Manage as admin" ON public.organization_members;

-- Create new, simplified policies
CREATE POLICY "View own membership"
  ON public.organization_members
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "View as organization member"
  ON public.organization_members
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.organization_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Manage as organization owner"
  ON public.organization_members
  FOR ALL
  USING (
    organization_id IN (
      SELECT id 
      FROM public.organizations 
      WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Manage as organization admin"
  ON public.organization_members
  FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM public.organization_members
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
    AND EXISTS (
      SELECT 1
      FROM public.organizations o
      WHERE o.id = organization_members.organization_id
      AND o.owner_id != organization_members.user_id
    )
  );

-- Create efficient indexes
CREATE INDEX IF NOT EXISTS idx_org_members_lookup 
ON public.organization_members(organization_id, user_id, role);

CREATE INDEX IF NOT EXISTS idx_orgs_owner_lookup
ON public.organizations(owner_id);

-- Create secure helper function for member management
CREATE OR REPLACE FUNCTION public.get_organization_access_level(org_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  -- Check if user is owner
  IF EXISTS (
    SELECT 1 FROM organizations
    WHERE id = org_id AND owner_id = auth.uid()
  ) THEN
    RETURN 'owner';
  END IF;

  -- Check if user is admin
  SELECT role INTO user_role
  FROM organization_members
  WHERE organization_id = org_id
  AND user_id = auth.uid()
  AND role = 'admin';

  IF user_role IS NOT NULL THEN
    RETURN user_role;
  END IF;

  -- Check if user is member
  SELECT role INTO user_role
  FROM organization_members
  WHERE organization_id = org_id
  AND user_id = auth.uid()
  AND role = 'member';

  RETURN COALESCE(user_role, 'none');
END;
$$;