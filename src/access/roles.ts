// src/access/roles.ts
import type { PayloadRequest } from 'payload'

export type IMARole =
  | 'admin'
  | 'pastor'
  | 'leader'
  | 'creator'
  | 'instructor'
  | 'mentor'
  | 'staff'
  | 'volunteer'
  | 'member'
  | 'student'
  | 'viewer'

export const ROLE_LIST: IMARole[] = [
  'admin',
  'pastor',
  'leader',
  'creator',
  'instructor',
  'mentor',
  'staff',
  'volunteer',
  'member',
  'student',
  'viewer',
]

/**
 * Role hierarchy — LOWER number = HIGHER authority
 * Adjust these numbers if you want certain roles to outrank others!
 */
export const ROLE_RANKING: Record<IMARole, number> = {
  admin: 0,
  pastor: 1,
  leader: 2,
  creator: 3,
  instructor: 4,
  mentor: 5,
  staff: 6,
  volunteer: 7,
  member: 8,
  student: 9,
  viewer: 10,
}

/**
 * Check if the user's single role is included in the allowed list
 */
export function userHasRole(req: PayloadRequest, allowedRoles: IMARole[]): boolean {
  const userRole = req.user?.role as IMARole | undefined
  if (!userRole) return false

  return allowedRoles.includes(userRole)
}

/**
 * Check if the user has at least the minimum required role hierarchy
 */
export function hasRoleAtLeast(req: PayloadRequest, minimum: IMARole): boolean {
  const userRole = req.user?.role as IMARole | undefined
  if (!userRole) return false

  return ROLE_RANKING[userRole] <= ROLE_RANKING[minimum]
}
