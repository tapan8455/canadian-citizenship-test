const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('path')

async function testProgress() {
  try {
    console.log('Testing progress tracking...')
    
    const dbPath = path.join(process.cwd(), 'data', 'citizenship-test.db')
    
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    })

    // Check if tables exist
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'")
    console.log('Database tables:', tables.map(t => t.name))

    // Check test_results table
    const testResults = await db.all('SELECT * FROM test_results ORDER BY completed_at DESC LIMIT 5')
    console.log('\nRecent test results:', testResults.length)
    testResults.forEach(result => {
      console.log(`- ${result.category}: ${result.score}% (${result.correct_answers}/${result.total_questions}) - ${result.completed_at}`)
    })

    // Check user_progress table
    const userProgress = await db.all('SELECT * FROM user_progress ORDER BY last_attempted DESC LIMIT 10')
    console.log('\nUser progress records:', userProgress.length)
    userProgress.forEach(progress => {
      console.log(`- ${progress.category}: ${progress.questions_correct}/${progress.questions_attempted} questions - ${progress.last_attempted}`)
    })

    // Check users table
    const users = await db.all('SELECT id, email, name, created_at FROM users')
    console.log('\nUsers:', users.length)
    users.forEach(user => {
      console.log(`- ${user.email} (${user.name}) - Created: ${user.created_at}`)
    })

    await db.close()
    
  } catch (error) {
    console.error('Error testing progress:', error)
  }
}

testProgress()
