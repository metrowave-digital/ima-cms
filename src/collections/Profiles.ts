import type { CollectionConfig } from 'payload'
import {
  profileReadAccess,
  profileUpdateAccess,
  hasRoleAtLeast,
  isAdminRoute,
} from '../access/control' // Adjust path as needed

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['user', 'headline', 'location'],
  },
  access: {
    // Uses the rules from your control.ts:
    // Public directory read, but only self/staff can update.
    read: profileReadAccess,
    update: profileUpdateAccess,
    create: ({ req }) => !!req.user, // Any logged-in user can create their profile
    delete: ({ req }) => hasRoleAtLeast(req, 'staff') || isAdminRoute(req),
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true, // Ensures 1-to-1 mapping (one profile per user)
      admin: {
        description: 'The user account associated with this profile.',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      label: 'Make Profile Public',
      defaultValue: true,
      admin: {
        description: 'If unchecked, this profile will not appear in the public member directory.',
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Professional Title / Headline',
      admin: {
        description: 'e.g., Independent Filmmaker | Media Student at FWC',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biography',
    },
    {
      name: 'location',
      type: 'text',
      label: 'City / Location',
    },
    {
      name: 'portfolioUrl',
      type: 'text',
      label: 'Portfolio or Personal Website',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'X (Twitter) URL',
        },
        {
          name: 'vimeo',
          type: 'text',
          label: 'Vimeo / YouTube Channel URL',
        },
      ],
    },
  ],
}
