import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_CACHE_URL!,
  token: process.env.UPSTASH_REDIS_REST_CACHE_TOKEN!,
})
