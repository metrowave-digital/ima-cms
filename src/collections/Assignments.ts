import type { CollectionConfig } from 'payload'

export const Assignments: CollectionConfig = {
  slug: 'assignments',
  upload: true, // Used for prompt attachments/worksheets
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
    },
    {
      name: 'instructions',
      type: 'richText',
    },
    {
      name: 'dueDate',
      type: 'date',
    },
  ],
}
