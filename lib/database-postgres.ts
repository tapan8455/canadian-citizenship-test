import { Pool } from 'pg'

let pool: Pool | null = null

export async function getDatabase() {
  if (pool) {
    return pool
  }

  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  })

  return pool
}

export async function closeDatabase() {
  if (pool) {
    await pool.end()
    pool = null
  }
}

// Query helper function
export async function query(text: string, params?: unknown[]) {
  const client = await getDatabase()
  try {
    const result = await client.query(text, params)
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}
