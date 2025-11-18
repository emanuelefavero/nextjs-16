import type { NewProduct, Product, ProductId } from '@/types/products'
import { createId } from '@paralleldrive/cuid2'
import { pool } from './db'

// * Create a new product (Return the newly created product or null on failure)
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

// * Delete a product by its ID (Return the deleted product or null if not found)
export async function deleteProduct(
  productId: ProductId,
): Promise<Product | null> {
  const client = await pool.connect()

  try {
    const query = `
      DELETE FROM "Product"
      WHERE id = $1
      RETURNING *
    `
    const values = [productId]
    const { rows } = await client.query(query, values)
    return rows[0] as Product // Return the deleted product
  } catch (error) {
    console.error(error)
  } finally {
    client.release()
  }
  return null
}
