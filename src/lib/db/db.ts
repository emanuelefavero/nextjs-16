import { Pool } from 'pg'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true, // Not needed if `sslmode=require` is in the connection string
})
