// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

/* -------------------------
 * COLLECTIONS
 * ------------------------- */
import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { Videos } from './collections/Videos'
import { Submissions } from './collections/Submissions'
import { Modules } from './collections/Modules'
import { Lessons } from './collections/Lessons'
import { Assignments } from './collections/Assignments'
import { Courses } from './collections/Courses'
import { Members } from './collections/Members'
import { FestivalSubmissions } from './collections/FestivalSubmissions'
import { AwardsSubmissions } from './collections/AwardsSubmissions'

/* -------------------------
 * GLOBALS
 * ------------------------- */
import { Settings } from './globals/Settings'
import { resolveUserEndpoint } from './endpoints/resolveUser'
import { updateProfileEndpoint } from './endpoints/updateProfile'
import { uploadAvatarEndpoint } from './endpoints/uploadAvatar'

/* -------------------------
 * PATH RESOLVING
 * ------------------------- */
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/* -------------------------
 * S3 / R2 ADAPTERS
 * ------------------------- */

// MAIN MEDIA BUCKET (ima-media)
const mediaAdapter = s3Storage({
  collections: {
    media: { prefix: 'media' },
  },
  bucket: process.env.MEDIA_S3_BUCKET!,
  config: {
    endpoint: process.env.MEDIA_S3_ENDPOINT!,
    region: process.env.MEDIA_S3_REGION!,
    credentials: {
      accessKeyId: process.env.MEDIA_S3_ACCESS_KEY!,
      secretAccessKey: process.env.MEDIA_S3_SECRET_KEY!,
    },
    forcePathStyle: true,
  },
})

// LMS BUCKET (fwc-lms)
const lmsAdapter = s3Storage({
  collections: {
    courses: { prefix: 'courses' },
    modules: { prefix: 'modules' },
    lessons: { prefix: 'lessons' },
    assignments: { prefix: 'assignments' },
    submissions: { prefix: 'submissions' },
  },
  bucket: process.env.LMS_S3_BUCKET!,
  config: {
    endpoint: process.env.LMS_S3_ENDPOINT!,
    region: process.env.LMS_S3_REGION!,
    credentials: {
      accessKeyId: process.env.LMS_S3_ACCESS_KEY!,
      secretAccessKey: process.env.LMS_S3_SECRET_KEY!,
    },
    forcePathStyle: true,
  },
})

// VIDEOS BUCKET (ima-videos)
const videosAdapter = s3Storage({
  collections: {
    videos: { prefix: 'videos' },
  },
  bucket: process.env.VIDEOS_S3_BUCKET!,
  config: {
    endpoint: process.env.VIDEOS_S3_ENDPOINT!,
    region: process.env.VIDEOS_S3_REGION!,
    credentials: {
      accessKeyId: process.env.VIDEOS_S3_ACCESS_KEY!,
      secretAccessKey: process.env.VIDEOS_S3_SECRET_KEY!,
    },
    forcePathStyle: true,
  },
})

// MEMBERS BUCKET (ima-members)
const membersAdapter = s3Storage({
  collections: {
    members: { prefix: 'members' },
  },
  bucket: process.env.MEMBERS_S3_BUCKET!,
  config: {
    endpoint: process.env.MEMBERS_S3_ENDPOINT!,
    region: process.env.MEMBERS_S3_REGION!,
    credentials: {
      accessKeyId: process.env.MEMBERS_S3_ACCESS_KEY!,
      secretAccessKey: process.env.MEMBERS_S3_SECRET_KEY!,
    },
    forcePathStyle: true,
  },
})

/* -------------------------
 * MAIN CONFIG (NO AUTH)
 * ------------------------- */
export default buildConfig({
  /* ---- ADMIN ---- */
  admin: {
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: '— Intercultural Media Alliance CMS' },

    // 🔥 AUTH REMOVED — no `admin.user`
    // The admin UI will load in "no auth" mode.
  },

  /* ---- COLLECTIONS ---- */
  collections: [
    Users,
    Media,
    Videos,
    Submissions,
    Modules,
    Lessons,
    Assignments,
    Courses,
    Members,
    FestivalSubmissions,
    AwardsSubmissions,
  ],

  /* ---- GLOBALS ---- */
  globals: [Settings],

  /* ---- ENDPOINTS --- */
  endpoints: [resolveUserEndpoint, updateProfileEndpoint, uploadAvatarEndpoint],

  /* ---- EDITOR ---- */
  editor: lexicalEditor(),

  /* ---- SECURITY ---- */
  secret: process.env.PAYLOAD_SECRET || 'fwc-default-secret',

  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://ima-web.vercel.app',
    'https://members.imanational.org',
    'https://imanational.org',
    'https://submissions.imanational.org',
    'https://festival.imanational.org',
    'https://learn.imanational.org',
    'https://cms.imanational.org',
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://ima-web.vercel.app',
    'https://members.imanational.org',
    'https://imanational.org',
    'https://submissions.imanational.org',
    'https://festival.imanational.org',
    'https://learn.imanational.org',
    'https://cms.imanational.org',
  ],

  /* ---- TYPESCRIPT ---- */
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  /* ---- DATABASE ---- */
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  /* ---- SHARP ---- */
  sharp,

  email: nodemailerAdapter({
    defaultFromAddress: 'cms@imanational.org',
    defaultFromName: 'Intercultural Media Alliance CMS',

    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),

  /* ---- STORAGE ADAPTERS ---- */
  plugins: [mediaAdapter, lmsAdapter, videosAdapter, membersAdapter],
})
