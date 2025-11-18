const BASE_URL = process.env.BASE_URL

export const isProd = process.env.NODE_ENV === 'production'
export const isDev = process.env.NODE_ENV !== 'production'
export const isTest = process.env.NODE_ENV === 'test'
export const baseUrl =
  BASE_URL || (isProd ? 'https://your-prod-url.com' : 'http://localhost:3000')

// ? Also exporting a single env object for grouped access
export const env = {
  isProd,
  isDev,
  isTest,
  baseUrl,
} as const
