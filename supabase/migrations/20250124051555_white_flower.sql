/*
  # Fix dashboard views with secure functions
  
  1. Changes
    - Create secure functions to handle data access
    - Create views that use these functions
    - Implement proper access control
  
  2. Security
    - Use security definer functions to enforce access control
    - Ensure data access is properly restricted to authenticated users
*/

-- Create secure function for service schedules
CREATE OR REPLACE FUNCTION public.get_user_schedules()
RETURNS SETOF dashboard.service_schedules
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM dashboard.service_schedules
  WHERE client_id = auth.uid();
$$;

-- Create secure function for service reports
CREATE OR REPLACE FUNCTION public.get_user_reports()
RETURNS SETOF dashboard.service_reports
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.*
  FROM dashboard.service_reports r
  JOIN dashboard.service_schedules s ON r.schedule_id = s.id
  WHERE s.client_id = auth.uid();
$$;

-- Create views using secure functions
CREATE OR REPLACE VIEW public.service_schedules AS
  SELECT * FROM public.get_user_schedules();

CREATE OR REPLACE VIEW public.service_reports AS
  SELECT * FROM public.get_user_reports();

-- Grant access to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_schedules() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_reports() TO authenticated;
GRANT SELECT ON public.service_schedules TO authenticated;
GRANT SELECT ON public.service_reports TO authenticated;