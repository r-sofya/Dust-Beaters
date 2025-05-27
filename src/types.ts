export interface ServicePackage {
  name: string;
  description: string;
  features: string[];
  price: string;
}

export interface Testimonial {
  name: string;
  company: string;
  content: string;
  image: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image: string;
}

export interface Organization {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  settings: Record<string, any>;
}

export interface OrganizationMember {
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
  updated_at: string;
  user?: {
    email: string;
    full_name?: string;
  };
}

export interface Team {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  team_id: string;
  user_id: string;
  role: 'team_lead' | 'manager' | 'member';
  permissions: Record<string, any>;
  created_at: string;
  updated_at: string;
  user?: {
    email: string;
    full_name?: string;
  };
}

export interface TeamClient {
  team_id: string;
  client_id: string;
  assigned_by: string;
  created_at: string;
  updated_at: string;
  client?: {
    email: string;
    full_name?: string;
  };
}

export interface TeamNotification {
  id: string;
  team_id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read_by: string[];
  created_at: string;
  expires_at?: string;
}

export interface DashboardTemplate {
  id: string;
  team_id: string;
  name: string;
  description?: string;
  layout: Record<string, any>;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardChange {
  id: string;
  template_id: string;
  changed_by: string;
  changes: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientSettings {
  client_id: string;
  team_id: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}