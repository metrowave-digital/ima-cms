import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [
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
      // Combine IMA and your expanded roles here:
      options: [
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
      ],
      defaultValue: 'student',
    },
    {
      name: 'avatarId',
      type: 'text',
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
