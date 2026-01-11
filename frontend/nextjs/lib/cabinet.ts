import { getUserRoles, getCurrentUser, type UserRole, type UserRoleWithDirection } from './auth';
import { supabase } from './supabaseClient';

export type CabinetType = 'member' | 'lead' | 'board' | 'staff' | null;

export interface UserCabinetInfo {
  user: any;
  roles: UserRoleWithDirection[];
  primaryRole: UserRole | null;
  cabinetType: CabinetType;
  hasAccess: boolean;
  directions: Array<{ id: string; title: string; slug: string }>;
}
