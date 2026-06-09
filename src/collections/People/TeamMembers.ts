import type { Access, CollectionConfig, FieldHook } from 'payload'

type PayloadUser = {
  id?: string | number
  role?: string
  roles?: string[]
  collection?: string
}

const TEAM_MEMBER_TYPES = [
  { label: 'Leadership', value: 'leadership' },
  { label: 'Board Member', value: 'board-member' },
  { label: 'Staff', value: 'staff' },
  { label: 'Advisor', value: 'advisor' },
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Teaching Artist', value: 'teaching-artist' },
  { label: 'Creative Partner', value: 'creative-partner' },
  { label: 'Founder', value: 'founder' },
]

const DEPARTMENTS = [
  { label: 'Executive Leadership', value: 'executive-leadership' },
  { label: 'Media & Storytelling', value: 'media-storytelling' },
  { label: 'Film & Production', value: 'film-production' },
  { label: 'Arts & Culture', value: 'arts-culture' },
  { label: 'Education & Training', value: 'education-training' },
  { label: 'Community Engagement', value: 'community-engagement' },
  { label: 'Development & Partnerships', value: 'development-partnerships' },
  { label: 'Operations', value: 'operations' },
  { label: 'Board Governance', value: 'board-governance' },
]

const SOCIAL_PLATFORMS = [
  { label: 'Website', value: 'website' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'X / Twitter', value: 'x' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Vimeo', value: 'vimeo' },
  { label: 'IMDb', value: 'imdb' },
  { label: 'Other', value: 'other' },
]

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const isAdminOrEditor: Access = ({ req }) => {
  const user = req.user as PayloadUser | undefined

  if (!user) return false

  const role = user.role
  const roles = user.roles ?? []

  return (
    role === 'admin' || role === 'editor' || roles.includes('admin') || roles.includes('editor')
  )
}

const formatSlug: FieldHook = ({ value, siblingData }) => {
  if (typeof value === 'string' && value.trim()) {
    return slugify(value)
  }

  if (siblingData && typeof siblingData.fullName === 'string' && siblingData.fullName.trim()) {
    return slugify(siblingData.fullName)
  }

  return value
}

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',

  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },

  admin: {
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'roleTitle',
      'profileType',
      'showOnLeadershipSection',
      'isActive',
      'displayOrder',
    ],
    group: 'People',
    description:
      'Manage public team, leadership, board, advisor, volunteer, and creative partner profiles.',
  },

  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },

  versions: false,

  defaultSort: 'displayOrder',

  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'slug',
      label: 'Profile Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Used for the public profile URL: /team/[slug].',
      },
      hooks: {
        beforeValidate: [formatSlug],
      },
    },
    {
      name: 'isActive',
      label: 'Active / Publicly Visible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'Turn this off to hide the team member from public frontend pages without deleting the profile.',
      },
    },
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      defaultValue: 100,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first. Example: 1 appears before 10.',
      },
    },
    {
      name: 'showOnLeadershipSection',
      label: 'Show in About Page Leadership Section',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'Controls whether this profile appears in the Leadership section on the About page.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              name: 'profileType',
              label: 'Profile Type',
              type: 'select',
              required: true,
              defaultValue: 'staff',
              options: TEAM_MEMBER_TYPES,
            },
            {
              name: 'roleTitle',
              label: 'Role / Title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Executive Director, Board Chair, Teaching Artist...',
              },
            },
            {
              name: 'department',
              label: 'Department / Area',
              type: 'select',
              options: DEPARTMENTS,
              admin: {
                description: 'Use this to group team members by area of responsibility.',
              },
            },
            {
              name: 'headshot',
              label: 'Headshot',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description:
                  'Recommended: square or portrait image. The frontend can crop it as needed.',
              },
            },
            {
              name: 'location',
              label: 'Location',
              type: 'text',
              admin: {
                placeholder: 'Hopkinsville, KY / Remote / Germany...',
              },
            },
          ],
        },
        {
          label: 'Biography',
          fields: [
            {
              name: 'shortBio',
              label: 'Short Bio',
              type: 'textarea',
              required: true,
              maxLength: 300,
              admin: {
                description: 'Brief summary for cards, grids, previews, and the About page.',
                placeholder: 'A short 1–2 sentence profile summary for this team member.',
              },
            },
            {
              name: 'longBio',
              label: 'Long Bio',
              type: 'textarea',
              required: true,
              admin: {
                rows: 12,
                description: 'Full plain-text biography for the individual profile page.',
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'email',
              label: 'Public Email',
              type: 'email',
              admin: {
                description:
                  'Optional. Only add this if it should be visible on the public website.',
              },
            },
            {
              name: 'phone',
              label: 'Public Phone',
              type: 'text',
              admin: {
                description:
                  'Optional. Only add this if it should be visible on the public website.',
              },
            },
            {
              name: 'socialLinks',
              label: 'Social Links',
              type: 'array',
              labels: {
                singular: 'Social Link',
                plural: 'Social Links',
              },
              fields: [
                {
                  name: 'platform',
                  label: 'Platform',
                  type: 'select',
                  required: true,
                  options: SOCIAL_PLATFORMS,
                },
                {
                  name: 'label',
                  label: 'Display Label',
                  type: 'text',
                  admin: {
                    placeholder: 'Follow on Instagram',
                  },
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                  required: true,
                  validate: (value: unknown) => {
                    if (!value || typeof value !== 'string') {
                      return 'A URL is required.'
                    }

                    try {
                      const parsed = new URL(value)
                      return ['http:', 'https:'].includes(parsed.protocol)
                        ? true
                        : 'URL must start with http:// or https://.'
                    } catch {
                      return 'Enter a valid URL.'
                    }
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Profile Page SEO',
          fields: [
            {
              name: 'seo',
              label: 'SEO',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'SEO Title',
                  type: 'text',
                  admin: {
                    placeholder: 'Team Member Name | Intercultural Media Alliance',
                  },
                },
                {
                  name: 'description',
                  label: 'SEO Description',
                  type: 'textarea',
                  maxLength: 170,
                  admin: {
                    rows: 3,
                    description: 'Optional meta description for the public profile page.',
                  },
                },
                {
                  name: 'image',
                  label: 'SEO Image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Optional social sharing image. If empty, the headshot can be used on the frontend.',
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
