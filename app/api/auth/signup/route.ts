import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDatabase } from '@/lib/database'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 })
    }

    const db = await getDatabase()
    try {
      const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email])
      
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'User already exists' }, { status: 409 })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const sql = 'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)'
      
      const result = await db.run(sql, [email, hashedPassword, name || null])

      return NextResponse.json({ success: true, data: { id: result.lastID } })
    } finally {
      await db.close()
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 })
  }
}
