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

    // Read and execute schema
    console.log('📋 Creating database schema...')
    const schemaPath = path.join(process.cwd(), 'scripts', 'postgresql-schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement)
      }
    }
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
