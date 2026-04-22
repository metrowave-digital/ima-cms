import type { CollectionConfig } from 'payload'

export const BallCategories: CollectionConfig = {
  slug: 'ball-categories',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'group', 'prizeAmount', 'scoringCriteria'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Title',
    },
    {
      name: 'group',
      type: 'select',
      required: true,
      options: [
        { label: 'Grand Prize', value: 'grand-prize' },
        { label: 'Fashion', value: 'fashion' },
        { label: 'Realness', value: 'realness' },
        { label: 'Beauty & Appeal', value: 'beauty-appeal' },
        { label: 'Performance', value: 'performance' },
        { label: 'Runway', value: 'runway' },
      ],
    },
    // --- ADDED RELATIONSHIP FIELD ---
    {
      name: 'scoringCriteria',
      type: 'relationship',
      relationTo: 'ball-scoring-criteria',
      hasMany: true,
      label: 'Applicable Scoring Criteria',
      admin: {
        position: 'sidebar', // Moves it to the right side in the UI for better organization
        description: 'Select the criteria that will be used to judge this category.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'prizeAmount',
          type: 'number',
          label: 'Prize Amount ($)',
          admin: { width: '50%' },
        },
        {
          name: 'trophyCount',
          type: 'number',
          label: 'Number of Trophies',
          min: 0,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'isDuoCategory',
      type: 'checkbox',
      label: 'Is this a Duo category?',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Theme / Description',
    },
    {
      name: 'requirements',
      type: 'richText',
      label: 'Specific Rules & Sub-Categories',
    },
    {
      name: 'externalNotes',
      type: 'textarea',
      label: 'External Notes',
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Internal Notes',
      access: {
        read: ({ req: { user } }) => Boolean(user),
      },
    },
  ],
}
