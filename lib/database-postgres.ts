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
    const convertedSql = this.convertPlaceholders(sql)
    const result = await this.client.query(convertedSql, params)
    return result.rows
  }

  async get(sql: string, params?: unknown[]): Promise<unknown> {
    const convertedSql = this.convertPlaceholders(sql)
    const result = await this.client.query(convertedSql, params)
    return result.rows[0]
  }

  async run(sql: string, params?: unknown[]): Promise<{ lastID: number }> {
    const convertedSql = this.convertPlaceholders(sql)
    
    if (convertedSql.trim().toUpperCase().startsWith('INSERT')) {
      const result = await this.client.query(convertedSql + ' RETURNING id', params)
      return { lastID: result.rows[0]?.id || 0 }
    } else {
      const result = await this.client.query(convertedSql, params)
      return { lastID: result.rows[0]?.id || 0 }
    }
  }

  private convertPlaceholders(sql: string): string {
    let paramIndex = 1;
    let inString = false;
    let result = '';
    
    for (let i = 0; i < sql.length; i++) {
      // Toggle string state if we hit a single quote
      if (sql[i] === "'") {
        inString = !inString;
        result += sql[i];
      } 
      // Only replace '?' if we are NOT inside a string literal
      else if (sql[i] === '?' && !inString) {
        result += `$${paramIndex++}`;
      } 
      else {
        result += sql[i];
      }
    }
    return result;
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
  } finally {
    await client.close()
  }
}
