import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: {
    category: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const formattedCategory = params.category.replace(/-/g, ' ');
  const categoryTitle = formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1);

  return {
    title: `Canadian Citizenship Practice Test - ${categoryTitle}`,
    description: `Prepare for your official exam with our free Canadian Citizenship practice test for the ${categoryTitle} category.`,
    alternates: {
      canonical: `https://www.citizentestcanada.com/practice/${params.category}`,
    },
  };
}

export default function PracticeCategoryPage({ params }: Props) {
  const formattedCategory = params.category.replace(/-/g, ' ');
  const categoryTitle = formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Server-Rendered SEO Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Canadian Citizenship Practice Test: {categoryTitle}
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge of {categoryTitle} with questions based on the official <em>Discover Canada</em> study guide.
          </p>
        </header>

        {/* Interactive Practice Container */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <p className="text-sm text-gray-500 mb-4 text-center">
            Select your answer for each question below to check your score.
          </p>
          {/* Note: Insert your existing interactive client component here */}
        </div>

        {/* Server-Rendered Explanatory Text */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-gray-700 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            About the {categoryTitle} Section
          </h2>
          <p>
            The official Canadian citizenship test consists of 20 multiple-choice questions. You need to answer at least 15 questions correctly (75%) within 45 minutes to pass.
          </p>
          <p>
            Practicing by topic helps you focus on specific subjects like Canadian history, government structure, rights and responsibilities, and regional geography.
          </p>
          <div className="pt-4 border-t border-gray-200">
            <Link 
              href="/practice" 
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              &larr; Return to all practice test categories
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
