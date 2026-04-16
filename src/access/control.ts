// src/access/control.ts
import type { Access, PayloadRequest } from 'payload'
import {
  ROLE_LIST,
  ROLE_RANKING,
  type IMARole,
  userHasRole,
  hasRoleAtLeast as baseHasRoleAtLeast,
} from './roles'

/* ============================================================
   BASIC HELPERS
   ============================================================ */

export function isLoggedIn(req: PayloadRequest): boolean {
  return !!req.user
}

/**
 * Get the single role from the authenticated user.
 * Ensures it maps to a valid IMARole.
 */
export function getUserRole(req: PayloadRequest): IMARole | null {
  const role = req.user?.role as IMARole | undefined
  if (role && ROLE_LIST.includes(role)) {
    return role
  }
  return null
}

/**
 * Check if user has at least the required role within the role hierarchy.
 */
export function hasRoleAtLeast(req: PayloadRequest, minimum: IMARole): boolean {
  const role = getUserRole(req)
  if (!role) return false
  return ROLE_RANKING[role] <= ROLE_RANKING[minimum]
}

/**
 * Is this the admin panel?
 */
export function isAdminRoute(req: PayloadRequest): boolean {
  const url = req.url || ''
  return url.includes('/admin')
}

/* ============================================================
   GENERIC ACCESS HELPERS
   ============================================================ */

export const publicRead: Access = () => true

export const loggedIn: Access = ({ req }) => isLoggedIn(req)

export const isAdmin: Access = ({ req }) => hasRoleAtLeast(req, 'admin') || isAdminRoute(req)

/** Only admin, pastor, leader, creator, staff */
export const staffOnly: Access = ({ req }) => hasRoleAtLeast(req, 'staff') || isAdminRoute(req)

/** Instructors + leaders + pastors + admin + creators */
export const instructorsOnly: Access = ({ req }) =>
  hasRoleAtLeast(req, 'instructor') || isAdminRoute(req)

/** Mentors + higher level roles */
export const mentorsOnly: Access = ({ req }) => hasRoleAtLeast(req, 'mentor') || isAdminRoute(req)

/**
 * Utility: allow only specific roles
 */
export function allowRoles(roles: IMARole[]): Access {
  return ({ req }) => {
    if (isAdminRoute(req)) return true
    const userRole = getUserRole(req)
    return userRole !== null && roles.includes(userRole)
  }
}

/**
 * User can manage own document OR admin/staff
 */
export const allowIfSelfOrAdmin: Access = ({ req, id }) => {
  if (!req.user) return false
  if (hasRoleAtLeast(req, 'admin') || isAdminRoute(req)) return true
  return req.user.id === id
}

/* ============================================================
   DYNAMIC RULE ENGINE HELPERS
   ============================================================ */

/**
 * Get the current user's profile ID (if any).
 */
export async function getCurrentProfileId(
  req: PayloadRequest,
): Promise<string | number | undefined> {
  const user = req.user
  if (!user) return

  // If populated as ID directly on user
  if (typeof user.profile === 'string' || typeof user.profile === 'number') {
    return user.profile
  }

  // Otherwise lookup in a 'profiles' collection
  try {
    const result = await req.payload.find({
      collection: 'profiles',
      depth: 0,
      where: { user: { equals: user.id } },
      limit: 1,
    })

    const id = result.docs[0]?.id
    if (typeof id === 'string' || typeof id === 'number') return id
  } catch (error) {
    // Fails gracefully if 'profiles' collection doesn't exist in IMA yet
    return undefined
  }
}

/**
 * Access for Submissions:
 * - Admin/instructors/staff see all
 * - Students see only their own
 */
export const submissionAccess: Access = async ({ req }) => {
  if (!req.user) return false

  if (hasRoleAtLeast(req, 'instructor') || isAdminRoute(req)) {
    return true
  }

  const profileId = await getCurrentProfileId(req)
  if (!profileId) return false

  return {
    profile: { equals: profileId },
  }
}

/**
 * Profiles access:
 * - Staff/admin: full access
 * - Everyone else: public read
 */
export const profileReadAccess: Access = async ({ req }) => {
  if (hasRoleAtLeast(req, 'staff') || isAdminRoute(req)) return true
  return true // public directory
}

export const profileUpdateAccess: Access = async ({ req, id }) => {
  if (!req.user) return false
  if (hasRoleAtLeast(req, 'staff') || isAdminRoute(req)) return true

  const profileId = await getCurrentProfileId(req)
  return profileId === id
}

/* ============================================================
   LMS STRICT ACCESS
   ============================================================ */

export const lmsReadAccess: Access = ({ req }) => {
  if (!req.user) return false
  if (hasRoleAtLeast(req, 'student') || isAdminRoute(req)) return true
  return false
}

export const lmsWriteAccess: Access = ({ req }) =>
  hasRoleAtLeast(req, 'instructor') || isAdminRoute(req)
