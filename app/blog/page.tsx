import Link from 'next/link'
import { BookOpenIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import Script from 'next/script'

export const metadata = {
  title: 'Canadian Citizenship Test Blog - Study Tips & Resources',
  description: 'Get expert tips, study guides, and resources to help you pass the Canadian citizenship test. Learn about test format, common questions, and preparation strategies.',
  keywords: [
    'Canadian citizenship test tips',
    'citizenship test study guide',
    'Canada citizenship exam preparation',
    'citizenship test questions and answers',
    'Canadian citizenship test blog',
    'citizenship test resources'
  ],
  alternates: {
    canonical: 'https://www.citizentestcanada.com/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Most Common Canadian Citizenship Test Questions',
    excerpt: 'Discover the most frequently asked questions on the Canadian citizenship test and learn how to answer them correctly.',
    readTime: '6 min read',
    category: 'Test Questions',
    slug: 'canadian-citizenship-test-questions'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Canadian Citizenship Test Blog",
            "description": "Expert tips, study guides, and resources to help you pass the Canadian citizenship test.",
            "url": "https://www.citizentestcanada.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "CitizenTest Canada",
              "url": "https://www.citizentestcanada.com"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://www.citizentestcanada.com/blog/${post.slug}`,
              "datePublished": "2024-01-01",
              "author": {
                "@type": "Organization",
                "name": "CitizenTest Canada"
              }
            }))
          })
        }}
      />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Canadian Citizenship Test Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips, study guides, and resources to help you prepare for and pass the Canadian citizenship test
          </p>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Featured
            </span>
            <span className="text-gray-500 text-sm ml-4">8 min read</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Top 10 Most Common Canadian Citizenship Test Questions
          </h2>
          <p className="text-gray-600 mb-4">
            Discover the most frequently asked questions on the Canadian citizenship test and learn how to answer them correctly.
          </p>
          <Link 
            href="/blog/canadian-citizenship-test-questions"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Read full article →
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* More articles coming soon */}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Practicing?
          </h2>
          <p className="text-blue-100 mb-6">
            Take our free practice tests to see how well you know the material
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/practice"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Start Practice Test
            </Link>
            <Link 
              href="/progress"
              className="bg-blue-700 text-white hover:bg-blue-800 font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center"
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Ad Zone */}
      <AdZone position="blog-bottom" />

      <Footer />
    </div>
  )
}
