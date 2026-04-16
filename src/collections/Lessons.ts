import type { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  upload: true, // Acts as the primary lesson video or PDF
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'order',
      type: 'number',
    },
  ],
}
