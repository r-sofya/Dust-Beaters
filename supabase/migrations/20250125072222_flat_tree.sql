/*
  # Teams Dashboard Schema

  1. New Tables
    - teams: Team workspaces
    - team_members: Team member assignments and roles
    - team_clients: Client assignments to teams
    - team_activity_logs: Audit trail for team actions
    - team_notifications: Team-wide notifications
    - dashboard_templates: Customizable dashboard templates
    - dashboard_changes: Change tracking for dashboards
    - client_settings: Client-specific dashboard settings

  2. Security
    - Row Level Security (RLS) policies
    - Role-based access control
    - Audit logging
*/

-- Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create team_members table with role-based access
CREATE TABLE IF NOT EXISTS public.team_members (
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('team_lead', 'manager', 'member')),
  permissions jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (team_id, user_id)
);

-- Create team_clients table for client assignments
CREATE TABLE IF NOT EXISTS public.team_clients (
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (team_id, client_id)
);

-- Create team_activity_logs table for audit trail
CREATE TABLE IF NOT EXISTS public.team_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  details jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create team_notifications table
CREATE TABLE IF NOT EXISTS public.team_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('info', 'warning', 'success', 'error')),
  read_by jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Create dashboard_templates table
CREATE TABLE IF NOT EXISTS public.dashboard_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  layout jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create dashboard_changes table for version control
CREATE TABLE IF NOT EXISTS public.dashboard_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES public.dashboard_templates(id) ON DELETE CASCADE,
  changed_by uuid REFERENCES auth.users(id),
  changes jsonb NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create client_settings table
CREATE TABLE IF NOT EXISTS public.client_settings (
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (client_id, team_id)
);

-- Enable Row Level Security
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_settings ENABLE ROW LEVEL SECURITY;

-- Teams policies
CREATE POLICY "View teams" ON public.teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = teams.id AND user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = teams.organization_id
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Manage teams" ON public.teams
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = teams.organization_id
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- Team members policies
CREATE POLICY "View team members" ON public.team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = team_members.team_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Manage team members" ON public.team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = team_members.team_id
      AND user_id = auth.uid()
      AND role = 'team_lead'
    )
  );

-- Team clients policies
CREATE POLICY "View team clients" ON public.team_clients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = team_clients.team_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Manage team clients" ON public.team_clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = team_clients.team_id
      AND user_id = auth.uid()
      AND role IN ('team_lead', 'manager')
    )
  );

-- Activity logs policies
CREATE POLICY "View activity logs" ON public.team_activity_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = team_activity_logs.team_id AND user_id = auth.uid()
    )
  );

-- Notifications policies
CREATE POLICY "View notifications" ON public.team_notifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = team_notifications.team_id AND user_id = auth.uid()
    )
  );

-- Dashboard templates policies
CREATE POLICY "View templates" ON public.dashboard_templates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = dashboard_templates.team_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Manage templates" ON public.dashboard_templates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = dashboard_templates.team_id
      AND user_id = auth.uid()
      AND role IN ('team_lead', 'manager')
    )
  );

-- Dashboard changes policies
CREATE POLICY "View changes" ON public.dashboard_changes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm
      JOIN public.dashboard_templates dt ON tm.team_id = dt.team_id
      WHERE dt.id = dashboard_changes.template_id
      AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Create changes" ON public.dashboard_changes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.team_members tm
      JOIN public.dashboard_templates dt ON tm.team_id = dt.team_id
      WHERE dt.id = dashboard_changes.template_id
      AND tm.user_id = auth.uid()
    )
  );

-- Client settings policies
CREATE POLICY "View client settings" ON public.client_settings
  FOR SELECT USING (
    client_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = client_settings.team_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Manage client settings" ON public.client_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = client_settings.team_id
      AND user_id = auth.uid()
      AND role IN ('team_lead', 'manager')
    )
  );

-- Helper function to create a new team
CREATE OR REPLACE FUNCTION public.create_team(
  org_id uuid,
  team_name text,
  team_description text DEFAULT NULL,
  team_settings jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  team_id uuid;
BEGIN
  -- Check if user has permission to create team
  IF NOT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = org_id
    AND user_id = auth.uid()
    AND role IN ('owner', 'admin')
  ) THEN
    RAISE EXCEPTION 'Insufficient permissions to create team';
  END IF;

  -- Create team
  INSERT INTO public.teams (organization_id, name, description, settings)
  VALUES (org_id, team_name, team_description, team_settings)
  RETURNING id INTO team_id;

  -- Add creator as team lead
  INSERT INTO public.team_members (team_id, user_id, role)
  VALUES (team_id, auth.uid(), 'team_lead');

  -- Log activity
  INSERT INTO public.team_activity_logs (team_id, user_id, action, details)
  VALUES (
    team_id,
    auth.uid(),
    'team_created',
    jsonb_build_object(
      'team_name', team_name,
      'description', team_description
    )
  );

  RETURN team_id;
END;
$$;