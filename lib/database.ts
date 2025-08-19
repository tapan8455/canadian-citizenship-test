import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from 'path'

let db: Database | null = null

export async function getDatabase(): Promise<Database> {
  // Use PostgreSQL in production, SQLite in development
  if (process.env.NODE_ENV === 'production') {
    // Import PostgreSQL database module
    const { getDatabase: getPostgresDB } = await import('./database-postgres')
    return getPostgresDB()
  }

  // Use SQLite for development
  if (db) {
    return db
  }

  const dbPath = path.join(process.cwd(), 'data', 'citizenship-test.db')
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  // Enable foreign keys
  await db.exec('PRAGMA foreign_keys = ON')

  return db
}

export async function initializeDatabase() {
  const database = await getDatabase()

  // Create users table
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

  // Create test_results table
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

  // Create questions table
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

  // Create user_progress table
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

  console.log('Database initialized successfully')
}

export async function closeDatabase() {
  if (db) {
    await db.close()
    db = null
  }
}
