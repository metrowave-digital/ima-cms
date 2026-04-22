// src/globals/Settings.ts
import type { GlobalConfig } from 'payload'
import { hasRoleAtLeast } from '../access/control' // Assuming your RBAC helper is here

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Enterprise Site Settings',
  access: {
    read: () => true,
    update: ({ req }) => {
      if (!req.user) return false
      return hasRoleAtLeast(req, 'admin')
    },
  },
  admin: {
    description: 'Global configuration and site-specific overrides for the IMA network.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // --- TAB 1: GLOBAL ORGANIZATION SETTINGS ---
        {
          label: 'Global Org (IMA)',
          fields: [
            {
              name: 'globalOrgName',
              type: 'text',
              defaultValue: 'Intercultural Media Alliance',
              required: true,
            },
            {
              type: 'row',
              fields: [
                { name: 'contactEmail', type: 'email', required: true, admin: { width: '50%' } },
                { name: 'contactPhone', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              name: 'globalMailingAddress',
              type: 'textarea',
            },
            {
              name: 'defaultHeroImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Fallback hero image if a site-specific one is not provided.' },
            },
          ],
        },
        // --- TAB 2: SITE-SPECIFIC SETTINGS ---
        {
          label: 'Site-Specific Configurations',
          fields: [
            {
              name: 'sites',
              type: 'array',
              label: 'Managed Sites',
              admin: {
                initCollapsed: true,
                // Removed the inline RowLabel component to fix Payload v3 Server Component error
              },
              fields: [
                {
                  name: 'siteId',
                  type: 'select',
                  required: true,
                  label: 'Target Site',
                  options: [
                    { label: 'Intercultural Media Alliance (IMA)', value: 'ima' },
                    { label: 'Heritage Ball', value: 'heritage-ball' },
                    { label: 'Intercultural Media Festival', value: 'imf' },
                    { label: 'Igniting Dreams Scholarship Gala', value: 'gala' },
                  ],
                },
                { name: 'siteName', type: 'text', required: true, label: 'Display Name' },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'logoLight',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Logo (Light Mode)',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'logoDark',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Logo (Dark Mode)',
                      admin: { width: '50%' },
                    },
                  ],
                },
                { name: 'favicon', type: 'upload', relationTo: 'media' },

                // SEO Group
                {
                  name: 'seo',
                  type: 'group',
                  label: 'Default SEO & Meta',
                  fields: [
                    { name: 'metaTitle', type: 'text' },
                    { name: 'metaDescription', type: 'textarea' },
                    {
                      name: 'ogImage',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Open Graph Image (Social Share)',
                    },
                  ],
                },

                // System Controls
                {
                  name: 'systemState',
                  type: 'group',
                  label: 'System Controls',
                  fields: [
                    {
                      name: 'maintenanceMode',
                      type: 'checkbox',
                      label: 'Enable Maintenance Mode',
                      defaultValue: false,
                    },
                    {
                      name: 'maintenanceMessage',
                      type: 'textarea',
                      admin: { condition: (_, siblingData) => siblingData.maintenanceMode },
                    },
                  ],
                },
              ],
            },
          ],
        },
        // --- TAB 3: THIRD PARTY INTEGRATIONS ---
        {
          label: 'Integrations & Analytics',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics Measurement ID (G-XXXXXXXXXX)',
            },
            {
              name: 'metaPixelId',
              type: 'text',
              label: 'Meta/Facebook Pixel ID',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'posthogApiKey',
                  type: 'text',
                  label: 'PostHog Project API Key',
                  admin: {
                    width: '50%',
                    description: 'Your project token (starts with phc_...)',
                  },
                },
                {
                  name: 'posthogHostUrl',
                  type: 'text',
                  label: 'PostHog Host URL',
                  defaultValue: 'https://us.i.posthog.com',
                  admin: {
                    width: '50%',
                    description: 'Usually https://us.i.posthog.com or https://eu.i.posthog.com',
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
