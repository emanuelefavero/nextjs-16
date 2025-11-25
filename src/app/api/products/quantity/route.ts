import { updateProductQuantity } from '@/lib/db/mutations'
import type { ProductId, ProductQuantity } from '@/types/products'
import { revalidateTag } from 'next/cache'

type UpdateQuantityRequest = {
  id: ProductId
  quantity: ProductQuantity
}

// * Update product quantity by ID
// ? Example: PUT /api/products/quantity with JSON body { "id": "PRODUCT_ID", "quantity": NEW_QUANTITY }
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, quantity }: UpdateQuantityRequest = body

    // Basic validation
    if (!id) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 })
    }

    if (typeof quantity !== 'number' || quantity < 0) {
      return Response.json(
        { error: 'Quantity must be a non-negative number' },
        { status: 400 },
      )
    }

    const updatedProduct = await updateProductQuantity(id, quantity)

    if (!updatedProduct) {
      return Response.json({ error: 'Product not found' }, { status: 404 })
    }

    revalidateTag('products', { expire: 0 }) // * Revalidate cache immediately

    return Response.json({ data: updatedProduct }, { status: 200 })
  } catch (error) {
    console.error('Error updating product quantity:', error)
    return Response.json(
      { error: 'Error updating product quantity' },
      { status: 500 },
    )
  }
}
