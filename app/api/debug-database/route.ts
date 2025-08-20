import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Check for a secret key to prevent unauthorized access
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    
    if (secret !== process.env.SETUP_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await getDatabase()
    
    // Check if questions table exists and has data
    const tableInfo = await db.all("SELECT name FROM sqlite_master WHERE type='table'")
    
    let questionsCount = 0
    let sampleQuestions: Array<{ id: number; category: string; question: string; options: string }> = []
    
    try {
      // Try to get questions count
      const countResult = await db.get("SELECT COUNT(*) as count FROM questions")
      questionsCount = (countResult as { count: number })?.count || 0
      
      // Try to get sample questions
      sampleQuestions = await db.all("SELECT id, category, question, options FROM questions LIMIT 3") as Array<{ id: number; category: string; question: string; options: string }>
    } catch (error) {
      console.error('Error querying questions table:', error)
    }
    
    return NextResponse.json({
      success: true,
      debug: {
        tables: tableInfo,
        questionsCount,
        sampleQuestions,
        databaseType: process.env.DATABASE_URL ? 'PostgreSQL' : 'SQLite'
      }
    })

  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Debug failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
