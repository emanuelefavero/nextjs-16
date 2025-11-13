'use client'

import { useTransition } from 'react'
import { deleteProductAction } from './actions'

// TODO add spinner
// TODO color button red

type Props = {
  productId: string
}

export function DeleteProductButton({ productId }: Props) {
  const [pending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteProductAction(productId)
    })
  }

  return (
    <button
      onClick={handleDelete}
      aria-label='Delete product'
      title='Delete product'
      disabled={pending}
    >
      X
    </button>
  )
}
