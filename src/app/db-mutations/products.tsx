import { cacheLife, cacheTag } from 'next/cache'

import { getProducts } from '@/lib/db/queries'
import { ProductsTable } from './products-table'

export async function Products() {
  'use cache'
  cacheTag('products')
  cacheLife('hours')

  const products = await getProducts()

  if (!products.length) {
    return <div>No products found.</div>
  }

  return (
    <>
      <h2 className='mb-4 text-2xl font-bold'>Products</h2>

      <ProductsTable products={products} />
    </>
  )
}
