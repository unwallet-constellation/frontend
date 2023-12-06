import { MetadataRoute } from 'next'

import { siteMetdata } from '@/config/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteMetdata.title} | ${siteMetdata.shortDescription}`,
    short_name: siteMetdata.title,
    description: siteMetdata.description,
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
