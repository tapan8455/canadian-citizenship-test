interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function createRateLimit(config: RateLimitConfig) {
  return function rateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now()

    // Clean up expired entries
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })

    // Get or create rate limit entry
    if (!store[identifier]) {
      store[identifier] = {
        count: 0,
        resetTime: now + config.windowMs
      }
    }

    const entry = store[identifier]

    // Reset if window has passed
    if (entry.resetTime < now) {
      entry.count = 0
      entry.resetTime = now + config.windowMs
    }

    // Check if request is allowed
    const allowed = entry.count < config.maxRequests
    if (allowed) {
      entry.count++
    }

    return {
      allowed,
      remaining: Math.max(0, config.maxRequests - entry.count),
      resetTime: entry.resetTime
    }
  }
}

// Default rate limit: 100 requests per 15 minutes
export const defaultRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100
})

// Stricter rate limit for authentication: 5 requests per 15 minutes
export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5
})
