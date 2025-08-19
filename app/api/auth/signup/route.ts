import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDatabase } from '@/lib/database'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    console.log('🔍 Attempting to connect to database...')
    const db = await getDatabase()
    console.log('✅ Database connection established')
    
    // Check if user already exists
    console.log('🔍 Checking if user exists...')
    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email])
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password
    console.log('🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    console.log('👤 Creating user...')
    const sql = 'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)'
    console.log('📝 SQL Query:', sql)
    console.log('📝 Parameters:', [email, hashedPassword, name || null])
    
    const result = await db.run(sql, [email, hashedPassword, name || null])
    console.log('✅ User created successfully, ID:', result.lastID)

    return NextResponse.json({
      success: true,
      data: { id: result.lastID }
    })
    
  } catch (error) {
    console.error('❌ Error creating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
