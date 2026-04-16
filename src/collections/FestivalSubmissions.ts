import type { CollectionConfig } from 'payload'

export const FestivalSubmissions: CollectionConfig = {
  slug: 'festival-submissions',
  fields: [
    {
      name: 'projectTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'applicant',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: ['Short Film', 'Documentary', 'Animation', 'Feature'],
    },
    {
      name: 'externalMediaLink',
      type: 'text', // e.g., Vimeo or YouTube URL
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'reviewed', 'accepted', 'rejected'],
      defaultValue: 'pending',
    },
  ],
}
