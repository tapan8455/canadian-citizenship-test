import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Canadian Citizenship Test Practice 2026 - Free Online Practice Tests',
    template: '%s | CitizenTest Canada'
  },
  description: 'Master the 2026 Canadian Citizenship Test with our free online practice platform. 500+ official format questions, detailed explanations, and progress tracking.',
  keywords: [
    'Canadian citizenship test 2026',
    'citizenship practice test',
    'Canada citizenship exam',
    'citizenship test questions',
    'Canadian citizenship study guide',
    'citizenship test preparation',
    'free citizenship test'
  ],
  authors: [{ name: 'CitizenTest Canada' }],
  creator: 'CitizenTest Canada',
  publisher: 'CitizenTest Canada',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Essential for preventing relative URL errors in GSC
  metadataBase: new URL('https://www.citizentestcanada.com'),
  openGraph: {
    title: 'Canadian Citizenship Test Practice 2026 - Free Online Practice Tests',
    description: 'Master the Canadian Citizenship Test with our free online practice platform. 500+ questions, official format, detailed explanations.',
    url: 'https://www.citizentestcanada.com',
    siteName: 'CitizenTest Canada',
    images: [
      {
        url: '/og-image.svg',
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
    title: 'Canadian Citizenship Test Practice 2026 - Free Online Practice Tests',
    description: 'Master the Canadian Citizenship Test with our free online practice platform.',
    images: ['/og-image.svg'],
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
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
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
        
        {/* Global Google AdSense Script - Optimized for Next.js App Router */}
        <Script 
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8085911050404684"
          crossOrigin="anonymous"
        />
        
        {/* Structured Data Schema */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Canadian Citizenship Test Practice",
              "url": "https://www.citizentestcanada.com",
              "description": "Free Canadian Citizenship Test practice platform with 500+ questions, official format, and detailed explanations.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.citizentestcanada.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "CitizenTest Canada",
                "url": "https://www.citizentestcanada.com"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "CAD",
                "description": "Free access to Canadian Citizenship Test practice questions"
              }
            })
          }}
        />

        {/* FAQ Schema */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the Canadian Citizenship Test?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Canadian Citizenship Test is a mandatory exam for permanent residents applying for Canadian citizenship. It consists of 20 multiple-choice questions based on the Discover Canada study guide, with a 45-minute time limit. You need to answer 15 questions correctly (75%) to pass."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many questions are in the citizenship test?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The official Canadian Citizenship Test contains exactly 20 questions. Our practice tests follow the same format to give you the most realistic preparation experience possible."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this practice test free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! All our practice tests, study materials, and resources are completely free. We believe everyone should have access to quality citizenship test preparation materials."
                  }
                }
              ]
            })
          }}
        />
        
        <ErrorBoundary>
          <AuthProvider>
            <main role="main">
              {children}
            </main>
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
