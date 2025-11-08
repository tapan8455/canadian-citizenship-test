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
    default: 'Canadian Citizenship Test Practice - Free Online Practice Tests | Pass Your Exam',
    template: '%s | Canadian Citizenship Test Practice'
  },
  description: 'Master the Canadian Citizenship Test with our free online practice platform. 223+ official format questions, detailed explanations, progress tracking. Pass your citizenship exam with confidence!',
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
    'Canadian citizenship exam practice',
    'citizenship test online',
    'Canada citizenship practice',
    'citizenship test study guide',
    'Canadian citizenship questions',
    'citizenship exam preparation',
    'Canada citizenship test questions',
    'citizenship test practice online',
    'Canadian citizenship exam questions',
    'citizenship test study materials',
    'Canada citizenship exam practice',
    'citizenship test free',
    'Canadian citizenship test preparation',
    'citizenship test questions and answers',
    'Canada citizenship test study guide',
    'citizenship test practice questions',
    'Canadian citizenship test online',
    'citizenship exam questions',
    'Canada citizenship test preparation',
    'citizenship test study materials',
    'Canadian citizenship test guide'
  ],
  authors: [{ name: 'CitizenTest Canada' }],
  creator: 'CitizenTest Canada',
  publisher: 'CitizenTest Canada',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.citizentestcanada.com'),
  openGraph: {
    title: 'Canadian Citizenship Test Practice - Free Online Practice Tests',
    description: 'Master the Canadian Citizenship Test with our free online practice platform. 223+ questions, official format, detailed explanations.',
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
    title: 'Canadian Citizenship Test Practice - Free Online Practice Tests',
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
        <meta name="google-adsense-account" content="ca-pub-8085911050404684" />
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
        
        {/* Google AdSense */}
        
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
              "description": "Free Canadian Citizenship Test practice platform with 223+ questions, official format, and detailed explanations.",
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
