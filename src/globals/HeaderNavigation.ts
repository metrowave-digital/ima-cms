import type { GlobalConfig } from 'payload'

export const HeaderNavigation: GlobalConfig = {
  slug: 'header-navigation',
  label: 'Header Navigation',
  access: {
    read: () => true, // Publicly readable for the frontend
  },
  fields: [
    {
      name: 'siteNavigations',
      type: 'array',
      label: 'Site Navigations',
      admin: {
        description: 'Create a distinct navigation bar for each individual site.',
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
          name: 'items',
          type: 'array',
          label: 'Navigation Items',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Menu Item Label',
            },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'link',
              label: 'Menu Item Type',
              options: [
                { label: 'Standard Link', value: 'link' },
                { label: 'Simple Dropdown (Children)', value: 'dropdown' },
                { label: 'Mega Menu', value: 'megaMenu' },
              ],
            },
            // --- 1. STANDARD LINK FIELDS ---
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'link',
              },
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  admin: { width: '50%' },
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab?',
                  admin: { width: '50%' },
                },
              ],
            },
            // --- 2. SIMPLE DROPDOWN FIELDS ---
            {
              name: 'children',
              type: 'array',
              label: 'Dropdown Links',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'dropdown',
              },
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
            // --- 3. MEGA MENU FIELDS ---
            {
              name: 'megaMenu',
              type: 'group',
              label: 'Mega Menu Configuration',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'megaMenu',
              },
              fields: [
                {
                  name: 'columns',
                  type: 'array',
                  maxRows: 4, // Prevents the mega menu from breaking layout
                  label: 'Menu Columns',
                  fields: [
                    { name: 'title', type: 'text', label: 'Column Title (Optional)' },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        { name: 'label', type: 'text', required: true },
                        { name: 'url', type: 'text', required: true },
                        {
                          name: 'description',
                          type: 'textarea',
                          label: 'Brief Description (Optional)',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'featuredCallout',
                  type: 'group',
                  label: 'Featured Content / Callout',
                  admin: {
                    description: 'Optional featured block to sit alongside the mega menu columns.',
                  },
                  fields: [
                    { name: 'title', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    { name: 'image', type: 'upload', relationTo: 'media' }, // Ensure your media collection slug is 'media'
                    { name: 'callToActionUrl', type: 'text', label: 'Call to Action URL' },
                    { name: 'callToActionLabel', type: 'text', label: 'Call to Action Label' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
