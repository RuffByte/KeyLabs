import { getIp } from './get-ip' // Function to get the user's IP address

class RateLimitError extends Error {
  constructor() {
    super('Rate limit exceeded')
    this.name = 'RateLimitError'
  }
}
// Constants for the rate limiter
const PRUNE_INTERVAL = 60 * 1000 // 1 minute for pruning expired trackers

// Map to store request trackers
const trackers = new Map<
  string,
  {
    count: number // Count of requests made
    expiresAt: number // Timestamp when the limit will reset
  }
>()

// Function to prune expired trackers
function pruneTrackers() {
  const now = Date.now() // Get the current time

  for (const [key, value] of trackers.entries()) {
    if (value.expiresAt < now) {
      trackers.delete(key) // Remove trackers that have expired
    }
  }
}

// Set an interval to regularly prune expired trackers
setInterval(pruneTrackers, PRUNE_INTERVAL)

// Rate limiting function based on IP address
export async function rateLimitByIp({
  key = 'global', // Default key if none provided
  limit = 1, // Max requests allowed
  window = 10000, // Time window in milliseconds
}: {
  key: string
  limit: number
  window: number
}) {
  const ip = getIp() // Get the user's IP address

  if (!ip) {
    throw new RateLimitError() // Throw an error if no IP is found
  }

  await rateLimitByKey({
    // Call the generic rate limiting function
    key: `${ip}-${key}`, // Combine IP and custom key for uniqueness
    limit,
    window,
  })
}

// Generic rate limiting function
export async function rateLimitByKey({
  key = 'global', // Default key
  limit = 1, // Max requests allowed
  window = 10000, // Time window in milliseconds
}: {
  key: string
  limit: number
  window: number
}) {
  let tracker = trackers.get(key) || { count: 0, expiresAt: 0 } // Get or create tracker

  if (tracker.expiresAt < Date.now()) {
    // Check if the tracker has expired
    tracker.count = 0 // Reset count if expired
    tracker.expiresAt = Date.now() + window // Set new expiration time
  }

  tracker.count++ // Increment the request count

  if (tracker.count > limit) {
    // Check if the limit has been exceeded
    throw new RateLimitError() // Throw an error if the limit is exceeded
  }

  trackers.set(key, tracker) // Update the tracker in the map
}
