import type { CollectionConfig } from 'payload'

export const BallCategories: CollectionConfig = {
  slug: 'ball-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'group', 'prizeAmount', 'trophyCount'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Title',
      admin: {
        description: 'e.g., Best Dressed Spectator - Archives, FF Realness Duo: FQ & Drag',
      },
    },
    {
      name: 'group',
      type: 'select',
      required: true,
      label: 'Category Group',
      options: [
        { label: 'Grand Prize', value: 'grand-prize' },
        { label: 'Fashion', value: 'fashion' },
        { label: 'Realness', value: 'realness' },
        { label: 'Beauty & Appeal', value: 'beauty-appeal' },
        { label: 'Performance', value: 'performance' },
        { label: 'Runway', value: 'runway' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'prizeAmount',
          type: 'number',
          label: 'Prize Amount ($)',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'trophyCount',
          type: 'number',
          label: 'Number of Trophies',
          min: 0,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'isDuoCategory',
      type: 'checkbox',
      label: 'Is this a Duo category?',
      defaultValue: false,
      admin: {
        description: 'Note: Duos cannot be in the same house for each duo category.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Theme / Description',
      admin: {
        description:
          'Explain the aesthetic, theme, or cultural significance expected for this category.',
      },
    },
    {
      name: 'requirements',
      type: 'richText',
      label: 'Specific Rules & Sub-Categories',
      admin: {
        description:
          'Detail any specific breakdowns (e.g., Women vs FQ vs Drag vs Legend) or multi-part rules (e.g., Part 1 Production, Part 2 Crowning).',
      },
    },
  ],
}
