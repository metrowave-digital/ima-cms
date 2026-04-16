import type { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  upload: true,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'membershipLevel',
      type: 'select',
      options: ['Standard', 'Professional', 'Lifetime'],
      defaultValue: 'Standard',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
  ],
}
