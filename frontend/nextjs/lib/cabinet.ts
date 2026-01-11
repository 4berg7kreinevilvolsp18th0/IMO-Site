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

/**
 * Определить тип кабинета на основе ролей пользователя
 */
export function determineCabinetType(roles: UserRoleWithDirection[]): CabinetType {
  if (roles.length === 0) return null;

  // Приоритет ролей (от высшей к низшей)
  const rolePriority: Record<UserRole, number> = {
    board: 4,
    staff: 3,
    lead: 2,
    member: 1,
  };

  // Находим роль с наивысшим приоритетом
  const sortedRoles = [...roles].sort((a, b) => rolePriority[b.role] - rolePriority[a.role]);
  return sortedRoles[0].role as CabinetType;
}

/**
  const primaryRole = determineCabinetType(roles);
