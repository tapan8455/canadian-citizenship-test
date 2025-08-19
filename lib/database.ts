import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from 'path'

// Define a common interface for both SQLite and PostgreSQL
export interface DatabaseInterface {
  exec(sql: string): Promise<void>
  all(sql: string, params?: unknown[]): Promise<unknown[]>
  get(sql: string, params?: unknown[]): Promise<unknown>
  run(sql: string, params?: unknown[]): Promise<{ lastID: number }>
  close(): Promise<void>
}

let db: Database | null = null

export async function getDatabase(): Promise<DatabaseInterface> {
  // Use PostgreSQL in production, SQLite in development
  if (process.env.NODE_ENV === 'production') {
    // Import PostgreSQL database module
    const { getDatabase: getPostgresDB } = await import('./database-postgres')
    return getPostgresDB()
  }

  // Use SQLite for development
  if (db) {
    return db as unknown as DatabaseInterface
  }

  const dbPath = path.join(process.cwd(), 'data', 'citizenship-test.db')
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  // Enable foreign keys
  await db.exec('PRAGMA foreign_keys = ON')

  return db as unknown as DatabaseInterface
}

export async function initializeDatabase() {
  const database = await getDatabase()

  // Use different schema based on environment
  if (process.env.NODE_ENV === 'production') {
    // PostgreSQL schema
    await database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await database.exec(`
      CREATE TABLE IF NOT EXISTS test_results (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        category VARCHAR(50) NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        time_taken INTEGER,
        completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `)

    await database.exec(`
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        question TEXT NOT NULL,
        options JSONB NOT NULL,
        correct_answer INTEGER NOT NULL,
        explanation TEXT,
        difficulty VARCHAR(20) DEFAULT 'medium',
        province VARCHAR(10) DEFAULT 'all',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await database.exec(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        category VARCHAR(50) NOT NULL,
        questions_attempted INTEGER DEFAULT 0,
        questions_correct INTEGER DEFAULT 0,
        last_attempted TIMESTAMP WITH TIME ZONE,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `)
  } else {
    // SQLite schema
    await database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await database.exec(`
      CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        category TEXT NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        time_taken INTEGER,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `)

    await database.exec(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_answer INTEGER NOT NULL,
        explanation TEXT,
        difficulty TEXT DEFAULT 'medium',
        province TEXT DEFAULT 'all',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await database.exec(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        category TEXT NOT NULL,
        questions_attempted INTEGER DEFAULT 0,
        questions_correct INTEGER DEFAULT 0,
        last_attempted DATETIME,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `)
  }

  console.log('Database initialized successfully')
}

export async function closeDatabase() {
  if (db) {
    await db.close()
    db = null
  }
}
