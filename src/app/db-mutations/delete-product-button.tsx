'use client'

import { SpinnerIcon } from '@/components/icons/SpinnerIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { useTransition } from 'react'
import { deleteProductAction } from './actions'

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
      className='border border-error-foreground/20 bg-error px-4 py-[.4rem] disabled:opacity-75'
    >
      {pending ? (
        <SpinnerIcon className='border-error-foreground/80' />
      ) : (
        <TrashIcon strokeClass='stroke-error-foreground' />
      )}
    </button>
  )
}
