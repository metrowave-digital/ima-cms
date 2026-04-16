import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // <--- REQUIRED for the Payload Admin UI to boot
  fields: [
    // Note: Payload automatically adds 'email' and 'password' fields when auth is true.
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'student', 'creator', 'member'],
      defaultValue: 'student',
    },
    {
      name: 'avatarId',
      type: 'text',
    },
  ],
}
