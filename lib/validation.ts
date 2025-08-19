import { z } from 'zod'



// Test result validation
export const testResultSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  score: z.number().min(0).max(100, 'Score must be between 0 and 100'),
  totalQuestions: z.number().min(1, 'Total questions must be at least 1'),
  correctAnswers: z.number().min(0, 'Correct answers cannot be negative'),
  timeTaken: z.number().min(0, 'Time taken cannot be negative').optional()
})

// User registration validation
export const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
})

// User login validation
export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

// Province validation
export const provinceSchema = z.enum([
  'all', 'ab', 'bc', 'mb', 'nb', 'nl', 'ns', 'nt', 'nu', 'on', 'pe', 'qc', 'sk', 'yt'
], {
  errorMap: () => ({ message: 'Invalid province selection' })
})

// Category validation
export const categorySchema = z.enum([
  'general', 'history', 'government', 'geography', 'rights', 'full'
], {
  errorMap: () => ({ message: 'Invalid category selection' })
})

// Sanitize HTML input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim()
    .slice(0, 1000) // Limit length
}


