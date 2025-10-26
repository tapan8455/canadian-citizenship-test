import { NextRequest, NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/database'
// Use dynamic import for CJS interop

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

    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: false, error: 'DATABASE_URL environment variable is not set' },
        { status: 500 }
      )
    }

    console.log('🚀 Setting up production database...')
    console.log('Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')

    // Initialize database schema
    console.log('Creating database schema...')
    await initializeDatabase()
    
    // Import questions data
    console.log('Importing questions data...')
    const mod = (await import('@/scripts/setup-production-db')) as unknown as {
      setupProductionDatabase?: () => Promise<void>
      default?: { setupProductionDatabase?: () => Promise<void> }
    }
    const setupFn = mod.setupProductionDatabase ?? mod.default?.setupProductionDatabase
    if (!setupFn) {
      throw new Error('setupProductionDatabase function not found in scripts/setup-production-db')
    }
    await setupFn()

    console.log('✅ Production database setup complete!')

    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully'
    })

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to setup database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
