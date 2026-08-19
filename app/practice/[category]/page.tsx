import { Metadata } from 'next';
import PracticeTestRunner from '@/components/TestQuestion'; // Update path if your client component name differs

interface Props {
  params: {
    category: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// 1. Generate Canonical Metadata for Search Engines
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return {
    title: `Canadian Citizenship Practice Test - ${categoryName} Section`,
    description: `Free practice test questions for the ${categoryName} topic of the official Canadian citizenship exam. Test your knowledge now.`,
    alternates: {
      canonical: `https://www.citizentestcanada.com/practice/${params.category}`,
    },
  };
}

// 2. Server-Rendered Page Component
export default function PracticeCategoryPage({ params }: Props) {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return {
    /* Main wrapper with server-rendered SEO content */
  }
}
