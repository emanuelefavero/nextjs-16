import { pool } from '@/lib/db'
import type { Product } from '@/types/products'
import { ProductsList } from './products-list'

async function getProducts(): Promise<Product[]> {
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

export async function Products() {
  const products = await getProducts()

  if (!products.length) {
    return <div>No products found.</div>
  }

  return (
    <>
      <h2 className='mb-4 text-2xl font-bold'>Products</h2>

      <ProductsList products={products} />
    </>
  )
}
