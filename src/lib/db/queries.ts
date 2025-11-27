import type { Product } from '@/types/products'
import { cacheLife, cacheTag } from 'next/cache'
import { pool } from './db'

export async function getProducts(): Promise<Product[]> {
  'use cache'
  cacheTag('products') // * Tag this data for revalidation
  cacheLife('hours') // * Cache lifetime

  const client = await pool.connect()

  try {
    // Fetch all products, order by name
    const query = `
      SELECT *
      FROM "Product"
      ORDER BY name ASC
    `

    const { rows } = await client.query(query)
    return rows
  } catch (error) {
    console.error(error)
  } finally {
    client.release()
  }
  return []
}
