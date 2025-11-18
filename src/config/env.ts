const BASE_URL = process.env.BASE_URL
const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

/**
 * Environment configuration
 *
 * @example
 * import { env } from 'src/config/env'
 * console.log(env.baseUrl)
 */

export const env = {
  isProd: isProd,
  isDev: !isProd,
  isTest: isTest,
  baseUrl:
    BASE_URL ||
    (isProd ? 'https://your-prod-url.com' : 'http://localhost:3000'),
} as const
