import type { GlobalConfig } from 'payload'
import { hasRoleAtLeast } from '../access/control' // Adjust path to your RBAC helper

export const SitePopup: GlobalConfig = {
  slug: 'site-popup',
  label: 'Marketing Popups',
  access: {
    read: () => true, // Publicly readable so the frontend knows what to render
    update: ({ req }) => {
      if (!req.user) return false
      return hasRoleAtLeast(req, 'admin')
    },
  },
  admin: {
    description:
      'Manage modal popups for newsletter signups, ticket sales, or major announcements across the IMA network.',
  },
  fields: [
    {
      name: 'sitePopups',
      type: 'array',
      label: 'Site Popups',
      admin: {
        description: 'Configure popups independently for each site.',
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
          name: 'isActive',
          type: 'checkbox',
          label: 'Enable this popup',
          defaultValue: false,
        },

        // --- DISPLAY LOGIC & RULES ---
        {
          name: 'displayRules',
          type: 'group',
          label: 'Display Rules (Where & When)',
          fields: [
            {
              name: 'showOn',
              type: 'select',
              label: 'Target Pages',
              defaultValue: 'all',
              options: [
                { label: 'All Pages', value: 'all' },
                { label: 'Specific Pages Only', value: 'specific' },
              ],
            },
            {
              name: 'targetPaths',
              type: 'array',
              label: 'Specific Page Paths',
              admin: {
                condition: (_, siblingData) => siblingData.showOn === 'specific',
                description:
                  'Enter the exact URL paths where this popup should appear. (e.g., "/" for Home, "/categories" for the Roster page).',
              },
              fields: [
                {
                  name: 'path',
                  type: 'text',
                  required: true,
                  label: 'URL Path',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'frequency',
                  type: 'select',
                  label: 'Frequency',
                  defaultValue: 'once-per-session',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Every time the page loads', value: 'always' },
                    { label: 'Once per browsing session', value: 'once-per-session' },
                    { label: 'Once ever (Hide if closed previously)', value: 'once-ever' },
                  ],
                },
                {
                  name: 'delaySeconds',
                  type: 'number',
                  label: 'Delay (Seconds)',
                  defaultValue: 3,
                  admin: {
                    width: '50%',
                    description: 'How long to wait before showing the popup.',
                  },
                },
              ],
            },
          ],
        },

        // --- POPUP CONTENT ---
        {
          name: 'content',
          type: 'group',
          label: 'Popup Content',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Image (Optional)',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Headline',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Body Text',
            },
            {
              type: 'row',
              fields: [
                { name: 'ctaLabel', type: 'text', label: 'Button Label', admin: { width: '50%' } },
                { name: 'ctaUrl', type: 'text', label: 'Button URL', admin: { width: '50%' } },
              ],
            },
            {
              name: 'isNewsletterSignup',
              type: 'checkbox',
              label: 'Is this a Newsletter Signup?',
              defaultValue: false,
              admin: {
                description:
                  'If checked, your Next.js frontend should render an email input form instead of a standard button.',
              },
            },
          ],
        },
      ],
    },
  ],
}
