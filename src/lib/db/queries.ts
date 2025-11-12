import type { Product } from '@/types/products'
import { pool } from './db'

export async function getProducts(): Promise<Product[]> {
  const client = await pool.connect()

  try {
    const { rows } = await client.query('SELECT * FROM "Product"')
    return rows
  } catch (error) {
    console.error(error)
  } finally {
    client.release()
  }
  return []
}
