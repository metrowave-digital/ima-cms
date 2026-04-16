import type { CollectionConfig } from 'payload'

export const AwardsSubmissions: CollectionConfig = {
  slug: 'awards-submissions',
  fields: [
    {
      name: 'nomineeName',
      type: 'text',
      required: true,
    },
    {
      name: 'nominator',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'awardCategory',
      type: 'text',
      required: true,
    },
    {
      name: 'rationale',
      type: 'textarea',
      required: true,
    },
    {
      name: 'supportingDocuments',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
