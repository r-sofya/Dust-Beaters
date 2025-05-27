/*
  # Restrict Organization Creation to Admins

  1. Changes
    - Remove general organization creation policy
    - Add admin-only creation policy
    - Update create_organization function with admin check

  2. Security
    - Only admins can create organizations
    - Maintain existing access controls
    - Add audit logging
*/

-- Drop existing organization creation policy
DROP POLICY IF EXISTS "Users can create organizations" ON public.organizations;

-- Create new admin-only creation policy
CREATE POLICY "Admins can create organizations"
  ON public.organizations
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.organization_members om
      JOIN public.organizations o ON om.organization_id = o.id
      WHERE om.user_id = auth.uid()
      AND om.role = 'admin'
    )
    OR NOT EXISTS (
      SELECT 1 FROM public.organizations
    )
  );

-- Update create_organization function with admin check
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
  is_admin boolean;
  org_count int;
BEGIN
  -- Check if user is an admin in any organization
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE user_id = auth.uid()
    AND role = 'admin'
  ) INTO is_admin;

  -- Get total organization count
  SELECT COUNT(*) FROM public.organizations INTO org_count;

  -- Only allow creation if user is admin or no organizations exist
  IF NOT (is_admin OR org_count = 0) THEN
    RAISE EXCEPTION 'Only administrators can create new organizations';
  END IF;

  -- Create organization
  INSERT INTO public.organizations (name, owner_id, settings)
  VALUES (name, auth.uid(), settings)
  RETURNING id INTO org_id;

  -- Add owner as member
  INSERT INTO public.organization_members (organization_id, user_id, role)
  VALUES (org_id, auth.uid(), 'owner');

  -- Log organization creation
  INSERT INTO public.team_activity_logs (
    team_id,
    user_id,
    action,
    details
  ) VALUES (
    NULL,
    auth.uid(),
    'organization_created',
    jsonb_build_object(
      'organization_id', org_id,
      'name', name,
      'created_by', auth.uid()
    )
  );

  RETURN org_id;
END;
$$;