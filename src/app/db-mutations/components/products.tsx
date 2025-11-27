import { getProducts } from '@/lib/db/queries'
import { ProductsTable } from './products-table'

export async function Products() {
  // TIP: The `getProducts` function is cached: @see @/lib/db/queries.ts
  const products = await getProducts()

  if (!products.length) {
    return <div>No products found.</div>
  }

  return (
    <>
      <h2 className='mb-4'>Products</h2>

      <ProductsTable products={products} />
    </>
  )
}
