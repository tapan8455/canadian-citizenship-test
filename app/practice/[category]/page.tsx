import { Metadata } from 'next'
import PracticeCategoryClient from './PracticeCategoryClient'

interface Props {
  params: { category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryNames: { [key: string]: string } = {
    general: 'General Knowledge',
    history: 'Canadian History',
    government: 'Government & Politics',
    geography: 'Geography & Symbols',
    rights: 'Rights & Responsibilities',
    full: 'Official Practice Test'
  }

  const categoryName = categoryNames[params.category] || params.category

  return {
    title: `${categoryName} Practice Test - Canadian Citizenship Test | CitizenTest Canada`,
    description: `Take a free ${categoryName.toLowerCase()} practice test for the Canadian citizenship exam. 20 questions, 45 minutes, official format. Pass your citizenship test with confidence!`,
    keywords: [
      `Canadian citizenship ${params.category} test`,
      `${params.category} citizenship practice`,
      'Canada citizenship exam',
      'citizenship test questions',
      'Canadian citizenship study'
    ],
    alternates: {
      // This canonical tag fixes the Soft 404 issue caused by ?province=all
      canonical: `https://www.citizentestcanada.com/practice/${params.category}`,
    },
    openGraph: {
      title: `${categoryName} Practice Test - Canadian Citizenship`,
      description: `Take a free ${categoryName.toLowerCase()} practice test for the Canadian citizenship exam.`,
      url: `https://www.citizentestcanada.com/practice/${params.category}`,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function PracticeTestPage() {
  // This correctly renders your test questions again!
  return <PracticeCategoryClient />
}
