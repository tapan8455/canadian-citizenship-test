const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

async function setupProductionDatabase() {
  try {
    console.log('🚀 Setting up production database...')
    
    // Get database connection
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    const pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })

    console.log('✅ Connected to PostgreSQL database')

    // Drop existing tables first (in correct order due to foreign keys)
    console.log('🗑️  Dropping existing tables...')
    await pool.query('DROP TABLE IF EXISTS user_progress CASCADE')
    await pool.query('DROP TABLE IF EXISTS test_results CASCADE')
    await pool.query('DROP TABLE IF EXISTS questions CASCADE')
    await pool.query('DROP TABLE IF EXISTS users CASCADE')
    console.log('✅ Existing tables dropped')

    // Create schema directly (no file reading)
    console.log('📋 Creating database schema...')
    
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Questions table
    await pool.query(`
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

    // Test results table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_results (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        category VARCHAR(50) NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        time_taken INTEGER,
        completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // User progress table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        category VARCHAR(50) NOT NULL,
        questions_attempted INTEGER DEFAULT 0,
        questions_correct INTEGER DEFAULT 0,
        last_attempted TIMESTAMP WITH TIME ZONE,
        UNIQUE(user_id, category)
      )
    `)

    // Create indexes
    await pool.query('CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category)')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_questions_province ON questions(province)')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id)')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_test_results_completed_at ON test_results(completed_at)')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id)')
    
    console.log('✅ Database schema created')

    // Import questions data
    console.log('📝 Importing questions data...')
    const migrationPath = path.join(process.cwd(), 'migration.sql')
    if (fs.existsSync(migrationPath)) {
      const migration = fs.readFileSync(migrationPath, 'utf8')
      const insertStatements = migration
        .split('\n')
        .filter(line => line.trim().startsWith('INSERT INTO'))

      for (const statement of insertStatements) {
        if (statement.trim()) {
          await pool.query(statement)
        }
      }
      console.log(`✅ Imported ${insertStatements.length} questions`)
    } else {
      console.log('⚠️  No migration.sql file found. Questions will need to be imported manually.')
    }

    await pool.end()
    console.log('🎉 Production database setup complete!')
    console.log('Your app is now ready to use with PostgreSQL!')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  setupProductionDatabase()
}

module.exports = { setupProductionDatabase }
