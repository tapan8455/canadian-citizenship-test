# 🏗️ Canadian Citizenship Test - Complete Architecture Documentation

## 📋 **Project Overview**

**Project Name:** Canadian Citizenship Test Practice Platform  
**Technology Stack:** Next.js 14, TypeScript, PostgreSQL (Neon), NextAuth.js, Tailwind CSS  
**Deployment:** Vercel  
**Database:** Neon PostgreSQL  
**Authentication:** NextAuth.js with Google OAuth  

---

## 🏛️ **System Architecture**

### **High-Level Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Layer  │    │   Server Layer  │    │  Database Layer │
│                 │    │                 │    │                 │
│ • Next.js App   │◄──►│ • API Routes    │◄──►│ • PostgreSQL    │
│ • React         │    │ • Server Actions│    │ • Neon Cloud    │
│ • TypeScript    │    │ • Middleware    │    │ • User Data     │
│ • Tailwind CSS  │    │ • Auth Provider │    │ • Test Results  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📁 **Project Structure**

```
canadian-citizenship-test/
├── 📁 app/                          # Next.js 14 App Router
│   ├── 📁 about/                    # About page
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 auth/                 # Authentication APIs
│   │   │   ├── 📁 [...nextauth]/    # NextAuth.js configuration
│   │   │   └── 📁 signup/           # User registration
│   │   ├── 📁 questions/            # Questions API
│   │   ├── 📁 results/              # Test results API
│   │   ├── 📁 setup-database/       # Database setup
│   │   └── 📁 debug-database/       # Database debugging
│   ├── 📁 auth/                     # Authentication pages
│   │   ├── 📁 signin/               # Sign in page
│   │   └── 📁 signup/               # Sign up page
│   ├── 📁 blog/                     # Blog section
│   │   ├── 📁 [slug]/               # Dynamic blog posts
│   │   └── 📁 canadian-citizenship-test-questions/
│   ├── 📁 dashboard/                # User dashboard
│   ├── 📁 practice/                 # Practice tests
│   │   └── 📁 [category]/           # Category-specific tests
│   ├── 📁 progress/                 # Progress tracking
│   ├── 📁 study-guide/              # Study materials
│   ├── 📁 faq/                      # FAQ page
│   ├── 📁 privacy/                  # Privacy policy
│   ├── 📁 premium/                  # Premium features
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Homepage
│   ├── robots.ts                    # SEO robots
│   └── sitemap.ts                   # SEO sitemap
├── 📁 components/                   # Reusable components
│   ├── 📁 providers/                # Context providers
│   │   └── AuthProvider.tsx         # Authentication provider
│   ├── AdSense.tsx                  # Google AdSense
│   ├── AdZone.tsx                   # Advertisement zones
│   ├── ErrorBoundary.tsx            # Error handling
│   ├── Footer.tsx                   # Site footer
│   ├── Header.tsx                   # Site header
│   ├── LoadingSpinner.tsx           # Loading states
│   ├── ProvinceSelector.tsx         # Province selection
│   ├── TestQuestion.tsx             # Question component
│   └── TestResults.tsx              # Results display
├── 📁 data/                         # Static data files
├── 📁 lib/                          # Utility libraries
│   ├── auth.ts                      # Authentication utilities
│   ├── database.ts                  # Database utilities
│   ├── database-postgres.ts         # PostgreSQL connection
│   ├── rate-limit.ts                # Rate limiting
│   └── validation.ts                # Data validation
├── 📁 scripts/                      # Build and deployment scripts
│   ├── deploy.bat                   # Windows deployment
│   ├── deploy.ps1                   # PowerShell deployment
│   ├── deploy.sh                    # Linux deployment
│   ├── export-data.js               # Data export
│   ├── import-questions.js          # Question import
│   ├── install-nodejs.ps1           # Node.js installation
│   ├── postgresql-schema.sql        # Database schema
│   ├── setup-database.js            # Database setup
│   ├── setup-production-db.js       # Production DB setup
│   └── test-progress.js             # Progress testing
├── 📁 Questions&Answers/            # Question data
│   ├── AlbertaQuestions.txt         # Alberta-specific questions
│   └── BritishColumbia.txt          # BC-specific questions
├── package.json                     # Dependencies and scripts
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS config
├── tsconfig.json                    # TypeScript config
├── SEO_STRATEGY.md                  # SEO documentation
└── ARCHITECTURE.md                  # This file
```

---

## 🔧 **Technology Stack Details**

### **Frontend Technologies**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Heroicons** - Icon library

### **Backend Technologies**
- **Next.js API Routes** - Server-side API endpoints
- **NextAuth.js** - Authentication framework
- **PostgreSQL** - Primary database (Neon Cloud)
- **Prisma** - Database ORM (if used)

### **External Services**
- **Vercel** - Hosting and deployment
- **Neon** - PostgreSQL database hosting
- **Google OAuth** - Authentication provider
- **Google AdSense** - Advertisement monetization
- **Google Analytics** - Website analytics

---

## 🗄️ **Database Architecture**

### **Database Schema (PostgreSQL)**

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    category VARCHAR(100),
    difficulty_level INTEGER,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test results table
CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    category VARCHAR(100),
    time_taken INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress table
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

## 🔐 **Authentication Architecture**

### **NextAuth.js Configuration**
```typescript
// Authentication flow
User → NextAuth.js → Google OAuth → Database → Session
```

### **Authentication Providers**
- **Google OAuth** - Primary authentication method
- **Email/Password** - Fallback authentication (if implemented)

### **Session Management**
- **JWT Tokens** - Stateless session management
- **Database Sessions** - Persistent session storage
- **Middleware Protection** - Route-level authentication

---

## 🌐 **API Architecture**

### **API Endpoints**

```
/api/auth/
├── [...nextauth]     # NextAuth.js configuration
└── signup           # User registration

/api/questions       # Fetch practice questions
/api/results         # Submit test results
/api/setup-database  # Database initialization
/api/debug-database  # Database debugging
```

### **API Response Format**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

---

## 🎨 **Frontend Architecture**

### **Component Hierarchy**
```
App Layout
├── Header
│   ├── Navigation
│   ├── User Menu
│   └── AdZone
├── Main Content
│   ├── Page Components
│   ├── Test Components
│   └── Blog Components
├── Footer
└── AdZone
```

### **State Management**
- **React Hooks** - Local component state
- **Context API** - Global state (AuthProvider)
- **Server State** - API data management

---

## 🚀 **Deployment Architecture**

### **Vercel Deployment Pipeline**
```
GitHub Repository
    ↓
Vercel Build Process
    ↓
Next.js Build
    ↓
Static Generation
    ↓
Edge Network Deployment
```

### **Environment Configuration**
```env
# Production Environment Variables
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://citizentestcanada.com
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GA_MEASUREMENT_ID=...
```

---

## 📊 **SEO Architecture**

### **SEO Implementation**
- **Meta Tags** - Dynamic meta information
- **Structured Data** - Schema.org markup
- **Sitemap** - XML sitemap generation
- **Robots.txt** - Search engine directives
- **Canonical URLs** - Duplicate content prevention

### **SEO Components**
```typescript
// Metadata structure
interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: OpenGraphData;
  twitter: TwitterData;
}
```

---

## 🔒 **Security Architecture**

### **Security Measures**
- **HTTPS** - SSL/TLS encryption
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Input Validation** - Data sanitization
- **Authentication** - User verification
- **Authorization** - Role-based access

### **Security Headers**
```typescript
// Security middleware
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block'
};
```

---

## 📈 **Performance Architecture**

### **Performance Optimizations**
- **Static Generation** - Pre-rendered pages
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Dynamic imports
- **Caching** - Browser and CDN caching
- **Bundle Optimization** - Tree shaking

### **Performance Metrics**
- **Core Web Vitals** - LCP, FID, CLS
- **Lighthouse Score** - Performance auditing
- **Bundle Size** - JavaScript optimization

---

## 🔄 **Data Flow Architecture**

### **User Journey Flow**
```
1. User visits homepage
2. Browses content/practice tests
3. Signs up/logs in
4. Takes practice tests
5. Views results and progress
6. Accesses study materials
```

### **Data Flow Diagram**
```
User Input → Form Validation → API Request → Database → Response → UI Update
```

---

## 🧪 **Testing Architecture**

### **Testing Strategy**
- **Unit Tests** - Component testing
- **Integration Tests** - API testing
- **E2E Tests** - User journey testing
- **Performance Tests** - Load testing

### **Testing Tools**
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Cypress** - E2E testing
- **Lighthouse** - Performance testing

---

## 📋 **Development Workflow**

### **Git Workflow**
```
Feature Branch → Development → Testing → Pull Request → Main Branch → Deployment
```

### **Development Commands**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Code linting
npm run test         # Run tests
npm run deploy       # Deploy to production
```

---

## 🔧 **Configuration Files**

### **Key Configuration Files**
- **next.config.js** - Next.js configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **package.json** - Dependencies and scripts
- **.env.local** - Environment variables

---

## 📚 **Documentation Structure**

### **Project Documentation**
- **README.md** - Project overview
- **ARCHITECTURE.md** - This architecture guide
- **SEO_STRATEGY.md** - SEO implementation guide
- **DEPLOYMENT.md** - Deployment instructions
- **API_DOCS.md** - API documentation

---

## 🎯 **Future Architecture Considerations**

### **Scalability Plans**
- **Microservices** - Service decomposition
- **CDN** - Content delivery optimization
- **Caching Layer** - Redis implementation
- **Load Balancing** - Traffic distribution
- **Database Sharding** - Data partitioning

### **Feature Roadmap**
- **Mobile App** - React Native implementation
- **Real-time Features** - WebSocket integration
- **Advanced Analytics** - User behavior tracking
- **AI Integration** - Personalized learning
- **Multi-language Support** - Internationalization

---

**Last Updated:** December 2024  
**Architecture Version:** 1.0  
**Next Review:** January 2025
