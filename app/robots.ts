import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard',
          '/progress',
          '/auth/signin',
          '/auth/signup',
          '/auth/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard',
          '/progress',
          '/auth/signin',
          '/auth/signup',
          '/auth/*',
        ],
      },
    ],
    sitemap: 'https://citizentestcanada.com/sitemap.xml',
    host: 'https://citizentestcanada.com',
  }
}
