'use server'

import { createProduct, deleteProduct } from '@/lib/db/mutations'
import { updateTag } from 'next/cache'

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
export async function deleteProductAction(productId: string) {
  await deleteProduct(productId)
  updateTag('products')
}
