import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  upload: true,
  fields: [
    {
      name: 'assignment',
      type: 'relationship',
      relationTo: 'assignments',
      required: true,
    },
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'grade',
      type: 'number',
    },
    {
      name: 'feedback',
      type: 'textarea',
    },
  ],
}
