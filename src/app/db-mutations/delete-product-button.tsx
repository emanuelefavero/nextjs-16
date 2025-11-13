'use client'

import { deleteProductAction } from './actions'

type Props = {
  productId: string
}

export function DeleteProductButton({ productId }: Props) {
  const handleDelete = async () => {
    await deleteProductAction(productId)
  }

  return (
    <button
      onClick={handleDelete}
      aria-label='Delete product'
      title='Delete product'
    >
      X
    </button>
  )
}
