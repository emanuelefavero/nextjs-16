import { createProduct } from '@/lib/db/mutations'
import { getProducts } from '@/lib/db/queries'
import type { NewProduct, Product } from '@/types/products'
import { revalidateTag } from 'next/cache'

export async function GET() {
  // TIP: The `getProducts` function is cached: @see @/lib/db/queries.ts
  const products = await getProducts()
  return Response.json(products)
}

export async function POST(request: Request) {
  try {
    const body: NewProduct = await request.json()

    // TODO: Validation

    const createdProduct = await createProduct(body)

    if (!createdProduct) {
      return Response.json(
        { error: 'Failed to create product' },
        { status: 500 },
      )
    }

    revalidateTag('products', 'max') // * Revalidate cache
    // TIP: We cannot use `updateTag` in route handlers, we must use `revalidateTag`.
    // TIP: `max` option sets the tag to stale, forcing revalidation on next request. Alternatively, we can use {expire: 0} to immediately expire the tag.

    return Response.json({ data: createdProduct }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return Response.json({ error: 'Error creating product' }, { status: 500 })
  }
}
