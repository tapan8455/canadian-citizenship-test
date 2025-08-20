import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database'
import { defaultRateLimit } from '@/lib/rate-limit'
import { categorySchema, provinceSchema } from '@/lib/validation'

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
      // Simple parameter extraction with defaults
      category = searchParams.get('category') || undefined
      province = searchParams.get('province') || 'all'
      const limitParam = searchParams.get('limit')
      questionLimit = limitParam ? parseInt(limitParam) : 20
      


      // Validate category if provided
      if (category && !categorySchema.safeParse(category).success) {
        return NextResponse.json(
          { success: false, error: 'Invalid category' },
          { status: 400 }
        )
      }

      // Validate province
      if (!provinceSchema.safeParse(province).success) {
        return NextResponse.json(
          { success: false, error: 'Invalid province' },
          { status: 400 }
        )
      }

      // Validate limit
      if (questionLimit < 1 || questionLimit > 50) {
        return NextResponse.json(
          { success: false, error: 'Limit must be between 1 and 50' },
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
    
    // Add debug information
    console.log('Debug: Raw questions from database:', questions.length)
    console.log('Debug: Query:', query)
    console.log('Debug: Params:', params)
    if (questions.length > 0) {
      console.log('Debug: First question sample:', questions[0])
    }
    
    // Also check what categories exist in the database
    const categoriesResult = await db.all("SELECT DISTINCT category FROM questions")
    console.log('Debug: Available categories:', categoriesResult)
    
    // Parse the options JSON for each question
    const formattedQuestions = questions.map((q: unknown) => {
      const question = q as { options: string; [key: string]: unknown }
      try {
        // First try to parse as JSON
        return {
          ...question,
          options: JSON.parse(question.options)
        }
      } catch (parseError) {
        // If JSON parsing fails, check if it's already an array
        if (Array.isArray(question.options)) {
          return {
            ...question,
            options: question.options
          }
        }
        
        // If it's a string, try to split it into options (fallback)
        console.log('Falling back to string parsing for question:', question.id)
        const optionsString = question.options as string
        // Split by common delimiters and clean up
        const options = optionsString
          .split(/[•\n\r]/)
          .map(opt => opt.trim())
          .filter(opt => opt.length > 0)
          .slice(0, 4) // Take first 4 options
        
        return {
          ...question,
          options: options.length > 0 ? options : []
        }
      }
    }).filter(q => q.options.length > 0) // Filter out questions with no valid options
    
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
