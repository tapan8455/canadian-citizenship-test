const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('path')
const fs = require('fs')

async function exportData() {
  try {
    console.log('Exporting data from SQLite...')
    
    const dbPath = path.join(process.cwd(), 'data', 'citizenship-test.db')
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    })

    // Export questions
    const questions = await db.all('SELECT * FROM questions')
    
    // Create SQL insert statements for PostgreSQL
    let sqlStatements = []
    
    // Add questions
    sqlStatements.push('-- Questions data')
    for (const q of questions) {
      const question = q.question.replace(/'/g, "''") // Escape single quotes
      const options = q.options.replace(/'/g, "''")
      const explanation = (q.explanation || '').replace(/'/g, "''")
      
      sqlStatements.push(`INSERT INTO questions (category, question, options, correct_answer, explanation, difficulty, province) VALUES ('${q.category}', '${question}', '${options}', ${q.correct_answer}, '${explanation}', '${q.difficulty}', '${q.province}');`)
    }
    
    // Write to file
    fs.writeFileSync('migration.sql', sqlStatements.join('\n'))
    
    console.log(`Exported ${questions.length} questions to migration.sql`)
    console.log('You can run this SQL file on your PostgreSQL database')
    
    await db.close()
    
  } catch (error) {
    console.error('Error exporting data:', error)
  }
}

exportData()
