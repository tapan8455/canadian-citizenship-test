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
      
      if (questionNumber <= 146) {
        // Federal questions - categorize by content
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
      } else {
        // Provincial questions
        category = 'provincial'
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
    console.log('Importing questions from province-specific files...')
    
    // Read the main questions file (use Alberta as the base since it contains all questions)
    const questionsPath = path.join(process.cwd(), 'Questions&Answers', 'AlbertaQuestions.txt')
    
    if (!fs.existsSync(questionsPath)) {
      console.error('Questions file not found:', questionsPath)
      process.exit(1)
    }
    
    const questionsContent = fs.readFileSync(questionsPath, 'utf8')
    
    // Parse questions from the file
    const parsedQuestions = parseQuestions(questionsContent)
    console.log(`Parsed ${parsedQuestions.length} questions`)
    
    // Connect to database
    const dbPath = path.join(process.cwd(), 'data', 'citizenship-test.db')
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    })
    
    // Clear existing questions
    await db.run('DELETE FROM questions')
    console.log('Cleared existing questions')
    
    // Insert new questions - one set for all provinces
    let insertedCount = 0
    for (const q of parsedQuestions) {
      if (q.options.length === 4 && q.correct_answer >= 0) {
        // Insert each question once with 'all' province (available to all provinces)
        await db.run(`
          INSERT INTO questions (category, question, options, correct_answer, explanation, difficulty, province)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
          q.category,
          q.question,
          JSON.stringify(q.options),
          q.correct_answer,
          q.explanation || '',
          'medium',
          'all'
        ])
        insertedCount++
      } else {
        console.log(`Skipping question ${q.id}: Invalid format`)
      }
    }
    
    console.log(`Successfully imported ${insertedCount} questions`)
    
    // Show summary by category
    const categories = await db.all('SELECT category, COUNT(*) as count FROM questions GROUP BY category')
    console.log('\nQuestions by category:')
    categories.forEach(cat => {
      console.log(`  ${cat.category}: ${cat.count} questions`)
    })
    
    await db.close()
    console.log('Import completed successfully!')
    
  } catch (error) {
    console.error('Error importing questions:', error)
    process.exit(1)
  }
}

importQuestions()
