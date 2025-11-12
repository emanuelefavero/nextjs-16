import { cacheLife, cacheTag } from 'next/cache'

import { getProducts } from '@/lib/db/queries'
import { ProductsTable } from './products-table'

export async function Products() {
  'use cache'
  cacheTag('products') // * Tag this data for revalidation
  cacheLife('hours') // * Cache lifetime

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
