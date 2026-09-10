import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import Script from 'next/script'

export const metadata = {
  title: 'Canadian Citizenship Test Blog - Study Tips & Resources',
  description: 'Get expert tips, study guides, and resources to help you pass the Canadian citizenship test. Learn about test format, common questions, and preparation strategies.',
  alternates: {
    canonical: 'https://www.citizentestcanada.com/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Canadian Citizenship Test Blog",
            "description": "Expert tips, study guides, and resources to help you pass the Canadian citizenship test.",
            "url": "https://www.citizentestcanada.com/blog"
          })
        }}
      />
      <Header />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full animate-enter">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">
            Study <span className="text-amber-500">Resources</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto">
            Expert tips, study guides, and deep-dives to help you prepare for and absolutely crush the Canadian citizenship test.
          </p>
        </div>

        {/* Featured Post Card - Gamified */}
        <Link 
          href="/blog/canadian-citizenship-test-questions"
          className="block bg-white rounded-[2rem] shadow-soft border-2 border-slate-200 border-b-[8px] p-8 md:p-10 mb-12 hover:bg-slate-50 active:border-b-[2px] active:translate-y-[6px] transition-all group"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-amber-100 text-amber-700 text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg">
              Featured Guide
            </span>
            <span className="text-slate-400 font-bold text-sm flex items-center gap-1">
              <ClockIcon className="w-4 h-4" /> 8 min read
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 group-hover:text-amber-600 transition-colors">
            Top 10 Most Common Canadian Citizenship Test Questions
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-4xl">
            Discover the most frequently asked questions on the Canadian citizenship test and learn how to answer them correctly before your exam day.
          </p>
        </Link>

        {/* Blog Posts Grid (For future posts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Mapping future articles here */}
        </div>

        {/* Mini CTA */}
        <div className="bg-slate-800 rounded-[2rem] p-8 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
          <div className="text-left">
            <h2 className="text-2xl font-black text-white mb-2">Ready to Start Practicing?</h2>
            <p className="text-slate-400 font-medium">Take our free practice tests to see how well you know the material.</p>
          </div>
          <Link 
            href="/practice"
            className="px-8 py-4 rounded-xl font-extrabold text-slate-800 bg-white border-2 border-slate-200 border-b-[6px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[4px] transition-all whitespace-nowrap"
          >
            Start Practice Test
          </Link>
        </div>
      </main>

      <AdZone position="blog-bottom" />
      <Footer />
    </div>
  )
}

function ClockIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}