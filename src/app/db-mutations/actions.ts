import { createProduct } from '@/lib/db/mutations'
import { updateTag } from 'next/cache'

export async function createProductAction(formData: FormData) {
  'use server'

  const rawFormData = {
    name: formData.get('name') as string,
    quantity: Number(formData.get('quantity')),
    category: (formData.get('category') as string | null) || undefined,
  }

  await createProduct(rawFormData) // * Mutate DB
  updateTag('products') // * Revalidate cache
}
