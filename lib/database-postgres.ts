import { Pool, PoolClient } from 'pg'
import { DatabaseInterface } from './database'

let pool: Pool | null = null

// Create a database interface that matches SQLite's interface
class PostgresDatabase implements DatabaseInterface {
  private client: PoolClient

  constructor(client: PoolClient) {
    this.client = client
  }

  async exec(sql: string): Promise<void> {
    await this.client.query(sql)
  }

  async all(sql: string, params?: unknown[]): Promise<unknown[]> {
    const result = await this.client.query(sql, params)
    return result.rows
  }

  async get(sql: string, params?: unknown[]): Promise<unknown> {
    const result = await this.client.query(sql, params)
    return result.rows[0]
  }

  async run(sql: string, params?: unknown[]): Promise<{ lastID: number }> {
    const result = await this.client.query(sql, params)
    return { lastID: result.rows[0]?.id || 0 }
  }

  async close(): Promise<void> {
    this.client.release()
  }
}

export async function getDatabase(): Promise<PostgresDatabase> {
  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
  }

  const client = await pool.connect()
  return new PostgresDatabase(client)
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
    const result = await client.all(text, params)
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}
