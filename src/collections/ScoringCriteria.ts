import type { CollectionConfig } from 'payload'

export const ScoringCriteria: CollectionConfig = {
  slug: 'scoring-criteria',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Criteria Title',
      admin: {
        description: 'e.g., Technique, Creativity, Stage Presence',
      },
    },
    {
      name: 'association',
      type: 'select',
      required: true,
      hasMany: true, // Allows a criteria to belong to both Ballroom and Film
      options: [
        { label: 'Ballroom', value: 'ballroom' },
        { label: 'Film', value: 'film' },
      ],
      admin: {
        description: 'Which industry/context does this criteria apply to?',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Criteria Definition',
      admin: {
        description: 'Explain what judges should look for when scoring this specific criteria.',
      },
    },
  ],
}