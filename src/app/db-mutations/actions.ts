'use server'

import { createProduct, deleteProduct } from '@/lib/db/mutations'
import type { Product } from '@/types/products'
import { updateTag } from 'next/cache'

// TODO Validation

export type ActionResult<T> = { data: T } | { error: string }

// * Server Action to create a new product
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
  productId: string,
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
