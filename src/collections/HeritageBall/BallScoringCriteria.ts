// src/collections/HeritageBall/BallScoringCriteria.ts
import type { CollectionConfig } from 'payload'

export const BallScoringCriteria: CollectionConfig = {
  slug: 'ball-scoring-criteria',
  admin: {
    useAsTitle: 'title',
    description: 'Manage the weighted rubrics used by judges for specific category groups.',
    defaultColumns: ['title', 'targetCategoryGroup', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Rubric Title',
      admin: {
        description: 'e.g., "Mr. & Miss IMA (Best Dressed Duo)", "Fashion Categories"',
      },
    },
    {
      name: 'targetCategoryGroup',
      type: 'select',
      required: true,
      label: 'Applies To Category Group',
      options: [
        { label: 'Grand Prize (Mr. & Miss IMA)', value: 'grand-prize' },
        { label: 'Fashion', value: 'fashion' },
        { label: 'Realness', value: 'realness' },
        { label: 'Beauty & Appeal', value: 'beauty-appeal' },
        { label: 'Performance', value: 'performance' },
        { label: 'Runway', value: 'runway' },
      ],
    },
    {
      name: 'instructions',
      type: 'textarea',
      label: 'Judge Instructions',
      defaultValue:
        'Each category is evaluated using the weighted criteria below. Judges should reference these rubrics when assigning scores.',
    },
    {
      name: 'rubric',
      type: 'array',
      label: 'Weighted Criteria',
      minRows: 1,
      // Removed inline RowLabel component to fix Payload v3 Server Component error
      // --- ENTERPRISE VALIDATION: Ensure weights always equal exactly 100% ---
      validate: (value: unknown) => {
        if (!Array.isArray(value)) return true

        // Fix TS18046: Explicitly type the array objects so TypeScript knows 'weight' exists
        const rows = value as { weight?: number }[]

        const totalWeight = rows.reduce((acc, curr) => acc + (curr.weight || 0), 0)
        if (totalWeight !== 100) {
          return `The total weight of all criteria must equal exactly 100%. Currently, it is ${totalWeight}%.`
        }
        return true
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'criterionName',
              type: 'text',
              required: true,
              label: 'Criterion Name',
              admin: { width: '70%' },
            },
            {
              name: 'weight',
              type: 'number',
              required: true,
              label: 'Weight (%)',
              min: 1,
              max: 100,
              admin: { width: '30%' },
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Criterion Description (Optional)',
          admin: {
            description: 'Briefly explain what judges should look for in this specific criterion.',
          },
        },
      ],
    },
  ],
}
