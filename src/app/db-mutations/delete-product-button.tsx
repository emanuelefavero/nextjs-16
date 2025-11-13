'use client'

import { SpinnerIcon } from '@/components/icons/SpinnerIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { useTransition } from 'react'
import { deleteProductAction } from './actions'

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
      className='px-4 py-[.4rem]'
    >
      {pending ? <SpinnerIcon /> : <TrashIcon />}
    </button>
  )
}
