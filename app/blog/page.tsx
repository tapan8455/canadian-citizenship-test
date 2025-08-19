import Link from 'next/link'
import { BookOpenIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

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
  ]
}

const blogPosts = [
  {
    id: 1,
    title: 'How to Prepare for the Canadian Citizenship Test: A Complete Guide',
    excerpt: 'Learn the best strategies to prepare for your Canadian citizenship test, including study tips, practice methods, and what to expect on test day.',
    readTime: '8 min read',
    category: 'Study Guide',
    slug: 'how-to-prepare-canadian-citizenship-test'
  },
  {
    id: 2,
    title: 'Top 10 Most Common Canadian Citizenship Test Questions',
    excerpt: 'Discover the most frequently asked questions on the Canadian citizenship test and learn how to answer them correctly.',
    readTime: '6 min read',
    category: 'Test Questions',
    slug: 'top-10-common-citizenship-test-questions'
  },
  {
    id: 3,
    title: 'Understanding Canadian History: Key Events for the Citizenship Test',
    excerpt: 'Master the essential Canadian historical events and figures that are commonly tested on the citizenship exam.',
    readTime: '10 min read',
    category: 'History',
    slug: 'canadian-history-citizenship-test'
  },
  {
    id: 4,
    title: 'Canadian Government Structure: What You Need to Know',
    excerpt: 'Learn about Canada\'s parliamentary democracy, government branches, and political system for your citizenship test.',
    readTime: '7 min read',
    category: 'Government',
    slug: 'canadian-government-structure'
  },
  {
    id: 5,
    title: 'Canadian Geography: Provinces, Territories, and Landmarks',
    excerpt: 'Study Canada\'s geography, including all provinces, territories, major cities, and natural landmarks for the test.',
    readTime: '9 min read',
    category: 'Geography',
    slug: 'canadian-geography-provinces-territories'
  },
  {
    id: 6,
    title: 'Canadian Rights and Responsibilities: A Citizen\'s Guide',
    excerpt: 'Understand your rights and responsibilities as a Canadian citizen, including voting, jury duty, and civic participation.',
    readTime: '5 min read',
    category: 'Citizenship',
    slug: 'canadian-rights-responsibilities'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
            How to Prepare for the Canadian Citizenship Test: A Complete Guide
          </h2>
          <p className="text-gray-600 mb-4">
            Learn the best strategies to prepare for your Canadian citizenship test, including study tips, practice methods, and what to expect on test day. This comprehensive guide covers everything from understanding the test format to creating an effective study plan.
          </p>
          <Link 
            href="/blog/how-to-prepare-canadian-citizenship-test"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Read full article →
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs ml-3 flex items-center">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Practicing?
          </h2>
          <p className="text-blue-100 mb-6">
            Take our free practice tests to see how well you know the material
          </p>
          <Link 
            href="/practice"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg inline-flex items-center"
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Start Practice Test
          </Link>
        </div>
      </div>
    </div>
  )
}
