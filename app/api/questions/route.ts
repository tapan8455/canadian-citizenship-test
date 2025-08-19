import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database'
import { defaultRateLimit } from '@/lib/rate-limit'
import { validateSearchParams, categorySchema, provinceSchema } from '@/lib/validation'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimit = defaultRateLimit(clientIP)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '100',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const { searchParams } = new URL(request.url)
    
    // Validate and sanitize input parameters
    let category: string | undefined
    let province: string
    let questionLimit: number
    
    try {
      const validatedParams = validateSearchParams(searchParams)
      category = validatedParams.category
      province = validatedParams.province || 'all'
      questionLimit = validatedParams.limit || 20

      // Additional validation for category and province
      if (category && !categorySchema.safeParse(category).success) {
        return NextResponse.json(
          { success: false, error: 'Invalid category' },
          { status: 400 }
        )
      }

      if (!provinceSchema.safeParse(province).success) {
        return NextResponse.json(
          { success: false, error: 'Invalid province' },
          { status: 400 }
        )
      }

    } catch (validationError) {
      return NextResponse.json(
        { success: false, error: validationError instanceof Error ? validationError.message : 'Invalid input' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    let query = 'SELECT * FROM questions WHERE 1=1'
    const params: (string | number)[] = []

    // Filter by province if specified
    if (province && province !== 'all') {
      query += ' AND (province = ? OR province = "all")'
      params.push(province)
    }
    
    if (category && category !== 'full') {
      query += ' AND category = ?'
      params.push(category)
    }
    
    query += ' ORDER BY RANDOM() LIMIT ?'
    params.push(questionLimit)
    
    const questions = await db.all(query, params)
    
    // Parse the options JSON for each question
    const formattedQuestions = questions.map((q: unknown) => {
      const question = q as { options: string; [key: string]: unknown }
      return {
        ...question,
        options: JSON.parse(question.options)
      }
    })
    
    return NextResponse.json({
      success: true,
      data: formattedQuestions
    })
    
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}
