'use server'

import { createProduct, deleteProduct } from '@/lib/db/mutations'
import type { Product, ProductId } from '@/types/products'
import { updateTag } from 'next/cache'

// TODO Validation

export type ActionResult<T> = { data: T } | { error: string }

// * Server Action to create a new product
// BEWARE: This action does not return any result, if you want to show feedback to the user, this must action must be called in client components instead of server component forms @see ./create-product-form.tsx
export async function createProductAction(formData: FormData) {
  const rawFormData = {
    name: formData.get('name') as string,
    quantity: Number(formData.get('quantity')),
    category: (formData.get('category') as string | null) || undefined,
  }

  await createProduct(rawFormData) // * Mutate DB
  updateTag('products') // * Revalidate cache
}

// * Server Action to delete a product
export async function deleteProductAction(
  productId: ProductId,
): Promise<ActionResult<Product>> {
  try {
    const deletedProduct = await deleteProduct(productId)
    if (!deletedProduct) return { error: 'Product not found' }
    updateTag('products')
    return { data: deletedProduct }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { error: 'Failed to delete product' }
  }
}
