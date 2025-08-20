import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Canadian Citizenship Test Practice - Free Online Practice Tests',
    template: '%s | Canadian Citizenship Test Practice'
  },
  description: 'Master the Canadian Citizenship Test with our free online practice platform. 3,100+ questions, official format (20 questions, 45 minutes), detailed explanations, and progress tracking.',
  keywords: [
    'Canadian citizenship test',
    'citizenship practice test',
    'Canada citizenship exam',
    'citizenship test questions',
    'Canadian citizenship study guide',
    'citizenship test preparation',
    'Canada immigration test',
    'citizenship practice questions',
    'free citizenship test',
    'Canadian citizenship exam practice'
  ],
  authors: [{ name: 'Canadian Citizenship Test Practice' }],
  creator: 'Canadian Citizenship Test Practice',
  publisher: 'Canadian Citizenship Test Practice',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://citizentestcanada.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Canadian Citizenship Test Practice - Free Online Practice Tests',
    description: 'Master the Canadian Citizenship Test with our free online practice platform. 3,100+ questions, official format, detailed explanations.',
    url: 'https://citizentestcanada.com',
    siteName: 'Canadian Citizenship Test Practice',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Canadian Citizenship Test Practice',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canadian Citizenship Test Practice - Free Online Practice Tests',
    description: 'Master the Canadian Citizenship Test with our free online practice platform.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-8085911050404684" />
      </head>
      <body className={inter.className}>
        {process.env.GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8085911050404684"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
