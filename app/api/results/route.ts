import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { category, score, totalQuestions, correctAnswers, timeTaken } = body

    if (!category || score === undefined || !totalQuestions || correctAnswers === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Get user ID
    const user = await db.get('SELECT id FROM users WHERE email = ?', [session.user.email]) as { id: number } | undefined
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Save test result
    const result = await db.run(`
      INSERT INTO test_results (user_id, category, score, total_questions, correct_answers, time_taken)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [user.id, category, score, totalQuestions, correctAnswers, timeTaken])

    // Update user progress - accumulate the values
    const existingProgress = await db.get(
      'SELECT questions_attempted, questions_correct FROM user_progress WHERE user_id = ? AND category = ?',
      [user.id, category]
    )

    if (existingProgress) {
      // Update existing progress by adding new values
      await db.run(`
        UPDATE user_progress 
        SET questions_attempted = questions_attempted + ?, 
            questions_correct = questions_correct + ?, 
            last_attempted = CURRENT_TIMESTAMP
        WHERE user_id = ? AND category = ?
      `, [totalQuestions, correctAnswers, user.id, category])
    } else {
      // Insert new progress record
      await db.run(`
        INSERT INTO user_progress (user_id, category, questions_attempted, questions_correct, last_attempted)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `, [user.id, category, totalQuestions, correctAnswers])
    }

    return NextResponse.json({
      success: true,
      data: { id: result.lastID }
    })
    
  } catch (error) {
    console.error('Error saving test result:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save test result' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10

    const db = await getDatabase()
    
    // Get user ID
    const user = await db.get('SELECT id FROM users WHERE email = ?', [session.user.email]) as { id: number } | undefined
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    let query = 'SELECT * FROM test_results WHERE user_id = ?'
    const params: (string | number)[] = [user.id]
    
    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }
    
    query += ' ORDER BY completed_at DESC LIMIT ?'
    params.push(limit)
    
    const results = await db.all(query, params)
    
    return NextResponse.json({
      success: true,
      data: results
    })
    
  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch test results' },
      { status: 500 }
    )
  }
}
