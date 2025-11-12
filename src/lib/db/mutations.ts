import type { NewProduct, Product } from '@/types/products'
import { createId } from '@paralleldrive/cuid2'
import { pool } from './db'

export async function createProduct(data: NewProduct): Promise<Product | null> {
  const client = await pool.connect()

  try {
    const { name, quantity, category } = data
    const id = createId()
    const query = `
      INSERT INTO "Product" (id, name, quantity, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const values = [id, name, quantity, category || null]
    const { rows } = await client.query(query, values)
    return rows[0] as Product // Return the newly created product
  } catch (error) {
    console.error(error)
  } finally {
    client.release()
  }
  return null
}
