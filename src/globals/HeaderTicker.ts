import type { GlobalConfig } from 'payload'
import { hasRoleAtLeast } from '../access/control' // Adjust path if your RBAC helper is located elsewhere

export const HeaderTicker: GlobalConfig = {
  slug: 'header-ticker',
  label: 'Header Ticker (Marquee)',
  access: {
    read: () => true, // Publicly readable for the frontend
    update: ({ req }) => {
      if (!req.user) return false
      return hasRoleAtLeast(req, 'admin')
    },
  },
  admin: {
    description: 'Manage the scrolling announcement marquee at the top of each site.',
  },
  fields: [
    {
      name: 'siteTickers',
      type: 'array',
      label: 'Site Tickers',
      admin: {
        description: 'Create and manage tickers independently for each site in the network.',
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
          label: 'Enable Ticker on this site',
          defaultValue: true,
        },
        {
          name: 'messages',
          type: 'array',
          label: 'Ticker Messages',
          minRows: 1,
          admin: {
            description:
              'Add the text phrases that will continuously scroll across the screen (e.g., "Legends Never Die"). They will be separated by a decorative star/icon on the frontend.',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Announcement Text',
            },
          ],
        },
        {
          name: 'link',
          type: 'group',
          label: 'Clickable Link (Optional)',
          admin: {
            description:
              'If provided, clicking anywhere on the scrolling marquee will redirect the user.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'url', type: 'text', label: 'Destination URL', admin: { width: '50%' } },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab?',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          name: 'appearance',
          type: 'group',
          label: 'Appearance Overrides (Optional)',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'backgroundColorHex',
                  type: 'text',
                  label: 'Background Color (Hex)',
                  admin: {
                    description: 'e.g., #FFE74C. Leave blank to use site default.',
                    width: '50%',
                  },
                },
                {
                  name: 'textColorHex',
                  type: 'text',
                  label: 'Text Color (Hex)',
                  admin: {
                    description: 'e.g., #170F11. Leave blank to use site default.',
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
