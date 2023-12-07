import { MetadataRoute } from 'next'

import { SITE_METADATA } from '@/config/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_METADATA.title} | ${SITE_METADATA.shortDescription}`,
    short_name: SITE_METADATA.title,
    description: SITE_METADATA.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
