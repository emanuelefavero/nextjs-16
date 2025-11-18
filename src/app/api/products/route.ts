import { createProduct, deleteProduct } from '@/lib/db/mutations'
import { getProducts } from '@/lib/db/queries'
import type { NewProduct } from '@/types/products'
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

    revalidateTag('products', { expire: 0 }) // * Revalidate cache
    // TIP: We cannot use `updateTag` in route handlers, we must use `revalidateTag`.
    // TIP: {expire: 0} option immediately expires the tag. Alternatively, we can use `max` to set the tag to stale and force revalidation on next request.

    return Response.json({ data: createdProduct }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return Response.json({ error: 'Error creating product' }, { status: 500 })
  }
}

// Delete a product by ID
// ? Example: DELETE /api/products?id=PRODUCT_ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('id') as string

    if (!productId) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const deletedProduct = await deleteProduct(productId)

    if (!deletedProduct) {
      return Response.json({ error: 'Product not found' }, { status: 404 })
    }

    revalidateTag('products', { expire: 0 }) // * Revalidate cache immediately

    return Response.json({ data: deletedProduct }, { status: 200 })
  } catch (error) {
    console.error('Error deleting product:', error)
    return Response.json({ error: 'Error deleting product' }, { status: 500 })
  }
}
