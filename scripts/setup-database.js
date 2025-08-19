const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('path')

async function setupDatabase() {
  try {
    console.log('Setting up database...')
    
    const dbPath = path.join(process.cwd(), 'data', 'citizenship-test.db')
    
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    })

    // Enable foreign keys
    await db.exec('PRAGMA foreign_keys = ON')

    // Create users table
    await db.exec(`
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
    await db.exec(`
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
    await db.exec(`
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
    await db.exec(`
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

    console.log('Database tables created successfully')
    
    // Sample questions data
    const sampleQuestions = [
      // General Knowledge
      {
        category: 'general',
        question: 'What is the capital city of Canada?',
        options: JSON.stringify(['Toronto', 'Montreal', 'Ottawa', 'Vancouver']),
        correct_answer: 2,
        explanation: 'Ottawa is the capital city of Canada, located in the province of Ontario.',
        difficulty: 'easy'
      },
      {
        category: 'general',
        question: 'Which of the following is a Canadian province?',
        options: JSON.stringify(['Alaska', 'Quebec', 'Greenland', 'Hawaii']),
        correct_answer: 1,
        explanation: 'Quebec is one of Canada\'s 10 provinces, located in eastern Canada.',
        difficulty: 'easy'
      },
      {
        category: 'general',
        question: 'What is the national animal of Canada?',
        options: JSON.stringify(['Moose', 'Beaver', 'Polar Bear', 'Caribou']),
        correct_answer: 1,
        explanation: 'The beaver is Canada\'s national animal and appears on the Canadian nickel.',
        difficulty: 'medium'
      },
      {
        category: 'general',
        question: 'How many provinces does Canada have?',
        options: JSON.stringify(['8', '9', '10', '11']),
        correct_answer: 2,
        explanation: 'Canada has 10 provinces: Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador, Nova Scotia, Ontario, Prince Edward Island, Quebec, and Saskatchewan.',
        difficulty: 'medium'
      },
      {
        category: 'general',
        question: 'What is the largest city in Canada by population?',
        options: JSON.stringify(['Toronto', 'Montreal', 'Vancouver', 'Calgary']),
        correct_answer: 0,
        explanation: 'Toronto is the largest city in Canada by population, with over 2.9 million people in the city proper.',
        difficulty: 'medium'
      },
      
      // History
      {
        category: 'history',
        question: 'In what year did Canada become a country?',
        options: JSON.stringify(['1865', '1867', '1870', '1871']),
        correct_answer: 1,
        explanation: 'Canada became a country on July 1, 1867, with the Confederation of four provinces: Ontario, Quebec, Nova Scotia, and New Brunswick.',
        difficulty: 'medium'
      },
      {
        category: 'history',
        question: 'Who was the first Prime Minister of Canada?',
        options: JSON.stringify(['John A. Macdonald', 'Alexander Mackenzie', 'Wilfrid Laurier', 'Robert Borden']),
        correct_answer: 0,
        explanation: 'Sir John A. Macdonald was Canada\'s first Prime Minister, serving from 1867 to 1873 and again from 1878 to 1891.',
        difficulty: 'medium'
      },
      {
        category: 'history',
        question: 'What was the name of the document that established Canada as a country?',
        options: JSON.stringify(['The Constitution Act', 'The British North America Act', 'The Canadian Charter', 'The Confederation Act']),
        correct_answer: 1,
        explanation: 'The British North America Act (now called the Constitution Act, 1867) established Canada as a country.',
        difficulty: 'hard'
      },
      
      // Government
      {
        category: 'government',
        question: 'What type of government does Canada have?',
        options: JSON.stringify(['Presidential Republic', 'Parliamentary Democracy', 'Absolute Monarchy', 'Dictatorship']),
        correct_answer: 1,
        explanation: 'Canada is a parliamentary democracy with a constitutional monarchy, where the monarch is the head of state and the Prime Minister is the head of government.',
        difficulty: 'medium'
      },
      {
        category: 'government',
        question: 'Who is the current head of state of Canada?',
        options: JSON.stringify(['The Prime Minister', 'The Governor General', 'The Queen', 'The President']),
        correct_answer: 2,
        explanation: 'The Queen (currently Queen Elizabeth II) is the head of state of Canada, represented by the Governor General.',
        difficulty: 'medium'
      },
      {
        category: 'government',
        question: 'How often are federal elections typically held in Canada?',
        options: JSON.stringify(['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years']),
        correct_answer: 2,
        explanation: 'Federal elections in Canada are typically held every 4 years, though they can be called earlier.',
        difficulty: 'medium'
      },
      
      // Geography
      {
        category: 'geography',
        question: 'How many provinces and territories does Canada have in total?',
        options: JSON.stringify(['10 provinces, 3 territories', '10 provinces, 2 territories', '9 provinces, 3 territories', '11 provinces, 2 territories']),
        correct_answer: 0,
        explanation: 'Canada has 10 provinces and 3 territories: Yukon, Northwest Territories, and Nunavut.',
        difficulty: 'medium'
      },
      {
        category: 'geography',
        question: 'What is the largest province in Canada by area?',
        options: JSON.stringify(['Ontario', 'Quebec', 'British Columbia', 'Alberta']),
        correct_answer: 1,
        explanation: 'Quebec is the largest province in Canada by area, covering over 1.5 million square kilometers.',
        difficulty: 'medium'
      },
      {
        category: 'geography',
        question: 'What is the national flag of Canada called?',
        options: JSON.stringify(['The Maple Leaf', 'The Red Ensign', 'The Union Jack', 'The Canadian Flag']),
        correct_answer: 0,
        explanation: 'The Canadian flag is commonly known as \'The Maple Leaf\' due to the prominent red maple leaf in the center.',
        difficulty: 'easy'
      },
      
      // Rights
      {
        category: 'rights',
        question: 'What document protects the rights and freedoms of Canadians?',
        options: JSON.stringify(['The Constitution', 'The Charter of Rights and Freedoms', 'The Bill of Rights', 'The Declaration of Independence']),
        correct_answer: 1,
        explanation: 'The Canadian Charter of Rights and Freedoms protects the fundamental rights and freedoms of all Canadians.',
        difficulty: 'medium'
      },
      {
        category: 'rights',
        question: 'Which of the following is a right guaranteed to Canadian citizens?',
        options: JSON.stringify(['Right to bear arms', 'Right to vote', 'Right to free healthcare', 'Right to free education']),
        correct_answer: 1,
        explanation: 'The right to vote in federal and provincial elections is guaranteed to Canadian citizens aged 18 and older.',
        difficulty: 'medium'
      },
      {
        category: 'rights',
        question: 'What is one responsibility of Canadian citizens?',
        options: JSON.stringify(['Paying taxes', 'Owning property', 'Having a job', 'Speaking English']),
        correct_answer: 0,
        explanation: 'Paying taxes is one of the key responsibilities of Canadian citizens.',
        difficulty: 'easy'
      }
    ]
    
    // Insert sample questions
    for (const question of sampleQuestions) {
      await db.run(`
        INSERT OR IGNORE INTO questions (category, question, options, correct_answer, explanation, difficulty)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [question.category, question.question, question.options, question.correct_answer, question.explanation, question.difficulty])
    }
    
    console.log(`Inserted ${sampleQuestions.length} sample questions`)
    console.log('Database setup completed successfully!')
    
    await db.close()
    
  } catch (error) {
    console.error('Error setting up database:', error)
    process.exit(1)
  }
}

setupDatabase()
