import type { GlobalConfig } from 'payload'

export const FooterNavigation: GlobalConfig = {
  slug: 'footer-navigation',
  label: 'Footer Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteFooters',
      type: 'array',
      label: 'Site Footers',
      admin: {
        description: 'Configure the footer structure independently for each site.',
      },
      fields: [
        {
          name: 'site',
          type: 'select',
          required: true,
          label: 'Assign to Site',
          options: [
            { label: 'Intercultural Media Alliance (IMA)', value: 'ima' },
            { label: 'Heritage Ball', value: 'heritage-ball' },
            { label: 'Intercultural Media Festival', value: 'imf' },
            { label: 'Igniting Dreams Scholarship Gala', value: 'gala' },
          ],
        },
        {
          name: 'columns',
          type: 'array',
          label: 'Link Columns',
          maxRows: 4,
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Column Title' },
            {
              name: 'links',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'url', type: 'text', required: true, admin: { width: '50%' } },
                  ],
                },
                { name: 'newTab', type: 'checkbox', label: 'Open in new tab?' },
              ],
            },
          ],
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Icons',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter / X', value: 'twitter' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'YouTube', value: 'youtube' },
              ],
            },
            { name: 'url', type: 'text', required: true, label: 'Profile URL' },
          ],
        },
        {
          name: 'bottomLegalLinks',
          type: 'array',
          label: 'Bottom Legal Links (Privacy, Terms, etc.)',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                { name: 'url', type: 'text', required: true, admin: { width: '50%' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
