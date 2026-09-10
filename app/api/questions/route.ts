import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database'
import { defaultRateLimit } from '@/lib/rate-limit'
import { categorySchema, provinceSchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
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
    
    let category: string | undefined
    let province: string
    let questionLimit: number
    
    try {
      category = searchParams.get('category') || undefined
      province = searchParams.get('province') || 'all'
      const limitParam = searchParams.get('limit')
      questionLimit = limitParam ? parseInt(limitParam) : 20

      if (category && !categorySchema.safeParse(category).success) {
        return NextResponse.json({ success: false, error: 'Invalid category' }, { status: 400 })
      }

      if (!provinceSchema.safeParse(province).success) {
        return NextResponse.json({ success: false, error: 'Invalid province' }, { status: 400 })
      }

      if (questionLimit < 1 || questionLimit > 50) {
        return NextResponse.json({ success: false, error: 'Limit must be between 1 and 50' }, { status: 400 })
      }

    } catch (validationError) {
      return NextResponse.json(
        { success: false, error: validationError instanceof Error ? validationError.message : 'Invalid input' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    try {
      let query = 'SELECT * FROM questions WHERE 1=1'
      const params: (string | number)[] = []

      if (province && province !== 'all') {
        query += " AND (province = ? OR province = 'all')"
        params.push(province)
      }
      
      if (category && category !== 'full') {
        query += ' AND category = ?'
        params.push(category)
      }
      
      query += ' ORDER BY RANDOM() LIMIT ?'
      params.push(questionLimit)
      
      const questions = await db.all(query, params)
      
      const formattedQuestions = questions.map((q: unknown) => {
        const question = q as { id: number, options: string; [key: string]: unknown }
        try {
          return { ...question, options: JSON.parse(question.options) }
        } catch (parseError) {
          if (Array.isArray(question.options)) {
            return { ...question, options: question.options }
          }
          
          const optionsString = question.options as string
          const options = optionsString.split(/[•\n\r]/).map(opt => opt.trim()).filter(opt => opt.length > 0).slice(0, 4)
          return { ...question, options: options.length > 0 ? options : [] }
        }
      }).filter(q => q.options.length > 0)
      
      return NextResponse.json({ success: true, data: formattedQuestions })
    } finally {
      await db.close()
    }
    
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch questions' }, { status: 500 })
  }
}
