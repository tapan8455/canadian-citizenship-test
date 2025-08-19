const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('path')
const fs = require('fs')

// Parse the questions from the file
function parseQuestions(content) {
  const questions = []
  const lines = content.split('\n')
  let currentQuestion = null
  let questionNumber = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) continue
    
    // Check if this is a question (starts with a number)
    const questionMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (questionMatch) {
      // Save previous question if exists
      if (currentQuestion) {
        questions.push(currentQuestion)
      }
      
      questionNumber = parseInt(questionMatch[1])
      const questionText = questionMatch[2]
      
      // Categorize questions based on content
      let category = 'general'
      const questionLower = questionText.toLowerCase()
      
      if (questionLower.includes('history') || questionLower.includes('confederation') || 
          questionLower.includes('war') || questionLower.includes('battle') ||
          questionLower.includes('first world war') || questionLower.includes('second world war') ||
          questionLower.includes('vimy ridge') || questionLower.includes('plains of abraham') ||
          questionLower.includes('underground railroad') || questionLower.includes('residential schools')) {
        category = 'history'
      } else if (questionLower.includes('government') || questionLower.includes('parliament') ||
                 questionLower.includes('prime minister') || questionLower.includes('governor general') ||
                 questionLower.includes('senate') || questionLower.includes('house of commons') ||
                 questionLower.includes('election') || questionLower.includes('vote') ||
                 questionLower.includes('political party') || questionLower.includes('cabinet')) {
        category = 'government'
      } else if (questionLower.includes('province') || questionLower.includes('territory') ||
                 questionLower.includes('capital') || questionLower.includes('city') ||
                 questionLower.includes('geography') || questionLower.includes('region') ||
                 questionLower.includes('ocean') || questionLower.includes('lake') ||
                 questionLower.includes('river') || questionLower.includes('mountain')) {
        category = 'geography'
      } else if (questionLower.includes('right') || questionLower.includes('freedom') ||
                 questionLower.includes('charter') || questionLower.includes('responsibility') ||
                 questionLower.includes('citizen') || questionLower.includes('vote') ||
                 questionLower.includes('equality') || questionLower.includes('law')) {
        category = 'rights'
      } else {
        category = 'general'
      }
      
      currentQuestion = {
        id: questionNumber,
        question: questionText,
        options: [],
        correct_answer: -1,
        explanation: '',
        category: category
      }
    } else if (currentQuestion && currentQuestion.options.length < 4) {
      // This is an option (no A, B, C, D prefix)
      let optionText = line
      const optionIndex = currentQuestion.options.length
      
      // Check if this is the correct answer (has "(correct answer)" at the end)
      if (optionText.includes('(correct answer)')) {
        currentQuestion.correct_answer = optionIndex
        currentQuestion.options[optionIndex] = optionText.replace(' (correct answer)', '')
      } else {
        currentQuestion.options[optionIndex] = optionText
      }
    }
  }
  
  // Add the last question
  if (currentQuestion) {
    questions.push(currentQuestion)
  }
  
  return questions
}

async function importQuestions() {
  try {
    console.log('Importing questions from AlbertaQuestions.txt...')
    
    // Get database path
    const dbPath = path.join(process.cwd(), 'data', 'citizenship-test.db')
    
    // Ensure data directory exists
    const dataDir = path.dirname(dbPath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Open database
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    })
    
    // Clear existing questions
    console.log('Clearing existing questions...')
    await db.exec('DELETE FROM questions')
    
    // Read only the Alberta questions file
    const questionsPath = path.join(process.cwd(), 'Questions&Answers', 'AlbertaQuestions.txt')
    
    if (!fs.existsSync(questionsPath)) {
      console.error('Questions file not found:', questionsPath)
      process.exit(1)
    }
    
    const content = fs.readFileSync(questionsPath, 'utf8')
    const questions = parseQuestions(content)
    console.log(`Found ${questions.length} questions in AlbertaQuestions.txt`)
    
    let totalQuestions = 0
    
    // Insert questions into database
    for (const question of questions) {
      if (question.options.length === 4 && question.correct_answer >= 0) {
        await db.run(`
          INSERT INTO questions (category, question, options, correct_answer, explanation, province)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          question.category,
          question.question,
          JSON.stringify(question.options),
          question.correct_answer,
          question.explanation || '',
          'all' // Use 'all' for all provinces since questions are comprehensive
        ])
        totalQuestions++
      } else {
        console.log(`Skipping question ${question.id}: Invalid format`)
      }
    }
    
    console.log(`✅ Successfully imported ${totalQuestions} questions`)
    
    // Verify the import
    const count = await db.get('SELECT COUNT(*) as count FROM questions')
    console.log(`Database now contains ${count.count} questions`)
    
    await db.close()
    
  } catch (error) {
    console.error('❌ Error importing questions:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  importQuestions()
}

module.exports = { importQuestions }
