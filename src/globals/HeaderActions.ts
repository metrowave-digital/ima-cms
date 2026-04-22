import type { GlobalConfig } from 'payload'
// Adjust path if your RBAC helper is located elsewhere
import { hasRoleAtLeast } from '../access/control'

export const HeaderActions: GlobalConfig = {
  slug: 'header-actions',
  label: 'Header Actions (CTAs)',
  access: {
    read: () => true,
    update: ({ req }) => {
      if (!req.user) return false
      return hasRoleAtLeast(req, 'admin')
    },
  },
  admin: {
    description:
      'Manage the Call-To-Action (CTA) buttons displayed on the right side of the main navigation bar.',
  },
  fields: [
    {
      name: 'siteActions',
      type: 'array',
      label: 'Site Action Buttons',
      dbName: 'site_actions', // <--- Prevent 63-char limit crash
      admin: {
        description: 'Configure CTAs independently for each site.',
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
          name: 'buttons',
          type: 'array',
          label: 'Buttons',
          dbName: 'action_btns', // <--- Prevent 63-char limit crash
          maxRows: 2, // Prevents breaking the header layout
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                { name: 'url', type: 'text', required: true, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'variant',
                  type: 'select',
                  label: 'Button Style',
                  defaultValue: 'primary',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Primary (Solid)', value: 'primary' },
                    { label: 'Secondary (Outline)', value: 'outline' },
                  ],
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab?',
                  defaultValue: false,
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
