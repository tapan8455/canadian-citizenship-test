# 🔧 Canadian Citizenship Test - Technical Specification

## 📋 **Project Overview**

**Project Name:** Canadian Citizenship Test Practice Platform  
**Version:** 1.0.0  
**Last Updated:** December 2024  
**Technology Stack:** Next.js 14, TypeScript, PostgreSQL, NextAuth.js, Tailwind CSS  

---

## 🎯 **Technical Requirements**

### **Functional Requirements**

#### **1. User Management**
- User registration and authentication via Google OAuth
- User profile management
- Role-based access control (User, Admin)
- Session management and persistence

#### **2. Practice Test System**
- 223+ practice questions covering all citizenship test topics
- 20 questions per test with 45-minute time limit
- Multiple choice and true/false question types
- Real-time scoring and feedback
- Progress tracking and analytics

#### **3. Content Management**
- Blog system with dynamic content
- Study guide with comprehensive materials
- FAQ system with searchable content
- SEO-optimized content structure

#### **4. Analytics and Reporting**
- User progress tracking
- Test performance analytics
- Admin dashboard with insights
- Export capabilities for data analysis

### **Non-Functional Requirements**

#### **Performance**
- Page load time: < 3 seconds
- API response time: < 500ms
- 99.9% uptime
- Support for 10,000+ concurrent users

#### **Security**
- HTTPS encryption
- OAuth 2.0 authentication
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting

#### **Scalability**
- Horizontal scaling capability
- CDN integration
- Database optimization
- Caching strategies

---

## 🏗️ **System Architecture**

### **Frontend Architecture**

#### **Technology Stack**
```typescript
// Core Technologies
- Next.js 14 (App Router)
- React 18
- TypeScript 5.0+
- Tailwind CSS 3.0+

// State Management
- React Hooks (useState, useEffect, useContext)
- NextAuth.js (Authentication state)

// UI Components
- Heroicons (Icons)
- React Hot Toast (Notifications)
- React Hook Form (Form handling)

// Styling
- Tailwind CSS (Utility-first CSS)
- CSS Modules (Component-specific styles)
```

#### **Component Architecture**
```typescript
// Component Structure
components/
├── providers/
│   └── AuthProvider.tsx          // Authentication context
├── Header.tsx                    // Site header with navigation
├── Footer.tsx                    // Site footer
├── TestQuestion.tsx              // Question display component
├── TestResults.tsx               // Results display component
├── LoadingSpinner.tsx            // Loading states
├── ErrorBoundary.tsx             // Error handling
├── AdZone.tsx                    // Advertisement zones
└── ProvinceSelector.tsx          // Province selection
```

### **Backend Architecture**

#### **API Routes Structure**
```typescript
// API Endpoints
app/api/
├── auth/
│   ├── [...nextauth]/
│   │   └── route.ts              // NextAuth.js configuration
│   └── signup/
│       └── route.ts              // User registration
├── questions/
│   └── route.ts                  // Questions API
├── results/
│   └── route.ts                  // Test results API
├── setup-database/
│   └── route.ts                  // Database initialization
└── debug-database/
    └── route.ts                  // Database debugging
```

#### **Database Schema**
```sql
-- Core Tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    category VARCHAR(100),
    difficulty_level INTEGER,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    category VARCHAR(100),
    time_taken INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    category VARCHAR(100),
    questions_attempted INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    last_attempted TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 **Security Specifications**

### **Authentication & Authorization**

#### **NextAuth.js Configuration**
```typescript
// Authentication providers
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      // Custom session handling
      return session;
    },
    async jwt({ token, user }) {
      // Custom JWT handling
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
};
```

#### **Security Headers**
```typescript
// Security middleware
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
};
```

### **Data Validation**
```typescript
// Input validation schemas
const questionSchema = z.object({
  question_text: z.string().min(10).max(1000),
  category: z.string().min(1).max(100),
  difficulty_level: z.number().min(1).max(5),
  correct_answer: z.string().min(1).max(500),
  explanation: z.string().optional(),
});

const testResultSchema = z.object({
  user_id: z.number().positive(),
  score: z.number().min(0).max(20),
  total_questions: z.number().min(1).max(20),
  category: z.string().min(1).max(100),
  time_taken: z.number().min(0).max(2700), // 45 minutes in seconds
});
```

---

## 📊 **Performance Specifications**

### **Frontend Performance**

#### **Core Web Vitals Targets**
```typescript
// Performance metrics
const performanceTargets = {
  LCP: '< 2.5s',      // Largest Contentful Paint
  FID: '< 100ms',     // First Input Delay
  CLS: '< 0.1',       // Cumulative Layout Shift
  TTFB: '< 600ms',    // Time to First Byte
  FCP: '< 1.8s',      // First Contentful Paint
};
```

#### **Optimization Strategies**
```typescript
// Next.js optimizations
const nextConfig = {
  // Image optimization
  images: {
    domains: ['citizentestcanada.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Bundle optimization
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
  },
  
  // Compression
  compress: true,
  
  // Caching
  generateEtags: true,
};
```

### **Database Performance**

#### **Indexing Strategy**
```sql
-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_test_results_user_id ON test_results(user_id);
CREATE INDEX idx_test_results_created_at ON test_results(created_at);
CREATE INDEX idx_user_progress_user_category ON user_progress(user_id, category);
```

#### **Query Optimization**
```sql
-- Optimized queries
-- Get user progress with efficient joins
SELECT 
    up.category,
    up.questions_attempted,
    up.correct_answers,
    ROUND((up.correct_answers::DECIMAL / up.questions_attempted) * 100, 2) as accuracy
FROM user_progress up
WHERE up.user_id = $1
ORDER BY up.last_attempted DESC;

-- Get recent test results with pagination
SELECT 
    tr.score,
    tr.total_questions,
    tr.category,
    tr.time_taken,
    tr.created_at
FROM test_results tr
WHERE tr.user_id = $1
ORDER BY tr.created_at DESC
LIMIT $2 OFFSET $3;
```

---

## 🚀 **Deployment Specifications**

### **Environment Configuration**

#### **Production Environment Variables**
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://citizentestcanada.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# AdSense
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-8085911050404684

# Security
NEXTAUTH_URL=https://citizentestcanada.com
```

#### **Vercel Configuration**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### **Build Process**
```bash
# Build commands
npm run build          # Production build
npm run lint           # Code linting
npm run type-check     # TypeScript checking
npm run test           # Unit tests
npm run e2e            # End-to-end tests
```

---

## 🧪 **Testing Specifications**

### **Testing Strategy**

#### **Unit Tests**
```typescript
// Component testing
import { render, screen } from '@testing-library/react';
import TestQuestion from '@/components/TestQuestion';

describe('TestQuestion Component', () => {
  it('renders question text correctly', () => {
    const question = {
      id: 1,
      question_text: 'What is the capital of Canada?',
      category: 'Geography',
      correct_answer: 'Ottawa'
    };
    
    render(<TestQuestion question={question} />);
    expect(screen.getByText('What is the capital of Canada?')).toBeInTheDocument();
  });
});
```

#### **API Testing**
```typescript
// API route testing
import { createMocks } from 'node-mocks-http';
import questionsHandler from '@/app/api/questions/route';

describe('/api/questions', () => {
  it('returns questions for valid category', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { category: 'Geography' },
    });

    await questionsHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
```

#### **E2E Testing**
```typescript
// End-to-end testing with Cypress
describe('Practice Test Flow', () => {
  it('completes a practice test successfully', () => {
    cy.visit('/practice');
    cy.get('[data-testid="start-test"]').click();
    
    // Answer questions
    for (let i = 0; i < 20; i++) {
      cy.get('[data-testid="question-option"]').first().click();
      cy.get('[data-testid="next-question"]').click();
    }
    
    cy.get('[data-testid="submit-test"]').click();
    cy.url().should('include', '/results');
  });
});
```

---

## 📈 **Monitoring & Analytics**

### **Performance Monitoring**

#### **Vercel Analytics**
```typescript
// Analytics configuration
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### **Error Tracking**
```typescript
// Error boundary implementation
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### **Database Monitoring**
```sql
-- Performance monitoring queries
-- Slow query analysis
SELECT 
    query,
    mean_time,
    calls,
    total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Connection monitoring
SELECT 
    state,
    count(*)
FROM pg_stat_activity
GROUP BY state;
```

---

## 🔄 **Data Flow Specifications**

### **User Journey Flow**

#### **Test Taking Process**
```typescript
// Test flow implementation
const testFlow = {
  1: 'User visits practice page',
  2: 'Selects test category',
  3: 'Starts practice test',
  4: 'Answers questions (20 total)',
  5: 'Submits test results',
  6: 'Views detailed results',
  7: 'Progress is saved to database',
  8: 'User can review explanations'
};
```

#### **Data Flow Diagram**
```typescript
// Data flow implementation
interface TestFlow {
  // 1. User starts test
  startTest: (category: string) => Promise<TestSession>;
  
  // 2. Load questions
  loadQuestions: (sessionId: string) => Promise<Question[]>;
  
  // 3. Submit answer
  submitAnswer: (sessionId: string, questionId: number, answer: string) => Promise<void>;
  
  // 4. Complete test
  completeTest: (sessionId: string) => Promise<TestResult>;
  
  // 5. Save results
  saveResults: (result: TestResult) => Promise<void>;
  
  // 6. Update progress
  updateProgress: (userId: string, result: TestResult) => Promise<void>;
}
```

---

## 📚 **Documentation Requirements**

### **Code Documentation**
```typescript
/**
 * TestQuestion Component
 * 
 * Displays a single practice test question with multiple choice options.
 * Handles user interaction and answer submission.
 * 
 * @param question - The question object containing text, options, and metadata
 * @param onAnswer - Callback function called when user selects an answer
 * @param isAnswered - Boolean indicating if the question has been answered
 * @param selectedAnswer - The user's selected answer (if any)
 * 
 * @example
 * ```tsx
 * <TestQuestion
 *   question={questionData}
 *   onAnswer={(answer) => handleAnswer(answer)}
 *   isAnswered={false}
 *   selectedAnswer={null}
 * />
 * ```
 */
```

### **API Documentation**
```typescript
/**
 * @api {get} /api/questions Get practice questions
 * @apiName GetQuestions
 * @apiGroup Questions
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} category Question category (optional)
 * @apiParam {Number} limit Number of questions to return (default: 20)
 * 
 * @apiSuccess {Object[]} questions Array of question objects
 * @apiSuccess {Number} questions.id Question ID
 * @apiSuccess {String} questions.question_text Question text
 * @apiSuccess {String} questions.category Question category
 * @apiSuccess {String[]} questions.options Answer options
 * 
 * @apiExample {curl} Example usage:
 *     curl -i https://citizentestcanada.com/api/questions?category=Geography
 */
```

---

## 🎯 **Future Enhancements**

### **Planned Features**
```typescript
// Future development roadmap
const roadmap = {
  phase1: {
    features: ['Mobile app', 'Offline support', 'Real-time analytics'],
    timeline: 'Q1 2025'
  },
  phase2: {
    features: ['AI-powered recommendations', 'Video tutorials', 'Social features'],
    timeline: 'Q2 2025'
  },
  phase3: {
    features: ['Multi-language support', 'Advanced reporting', 'API for third parties'],
    timeline: 'Q3 2025'
  }
};
```

### **Scalability Plans**
```typescript
// Scalability considerations
const scalabilityPlan = {
  database: {
    current: 'Single PostgreSQL instance',
    future: 'Read replicas, connection pooling, sharding'
  },
  caching: {
    current: 'Browser caching',
    future: 'Redis, CDN, edge caching'
  },
  architecture: {
    current: 'Monolithic Next.js app',
    future: 'Microservices, API gateway, event-driven'
  }
};
```

---

**Last Updated:** December 2024  
**Technical Specification Version:** 1.0  
**Next Review:** January 2025
