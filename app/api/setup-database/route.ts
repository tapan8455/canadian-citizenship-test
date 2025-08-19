import { NextRequest, NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/database'
import { setupProductionDatabase } from '@/scripts/setup-production-db'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  return await handleSetup(request)
}

export async function POST(request: NextRequest) {
  return await handleSetup(request)
}

async function handleSetup(request: NextRequest) {
  try {
    // Check if it's production environment
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json(
        { success: false, error: 'This endpoint is only available in production' },
        { status: 403 }
      )
    }

    // Check for a secret key to prevent unauthorized access
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    
    if (secret !== process.env.SETUP_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🚀 Setting up production database...')

    // Initialize database schema
    await initializeDatabase()
    
    // Import questions data
    await setupProductionDatabase()

    console.log('✅ Production database setup complete!')

    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully'
    })

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to setup database' },
      { status: 500 }
    )
  }
}
