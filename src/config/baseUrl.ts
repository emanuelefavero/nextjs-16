const BASE_URL = process.env.BASE_URL

export const baseUrl: string = BASE_URL
  ? BASE_URL
  : process.env.NODE_ENV === 'production'
    ? 'https://your-production-domain.com' // * Replace with your prod URL
    : 'http://localhost:3000'
