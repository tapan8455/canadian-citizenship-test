import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
      {
        userAgent: 'Googlebot',
        disallow: ['/auth/'],
      },
    ],
    sitemap: 'https://citizentestcanada.com/sitemap.xml',
  }
}
