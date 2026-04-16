import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
