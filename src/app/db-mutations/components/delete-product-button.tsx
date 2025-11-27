'use client'

import { deleteProductAction } from '@/app/db-mutations/actions'
import { useActionResultStore } from '@/app/db-mutations/store/actionResultStore'
import { SpinnerIcon } from '@/components/icons/SpinnerIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import type { ProductId } from '@/types/products'
import { useTransition } from 'react'

type Props = {
  productId: ProductId
}

export function DeleteProductButton({ productId }: Props) {
  const [pending, startTransition] = useTransition()
  const { setResult } = useActionResultStore()

  const handleDelete = async () => {
    startTransition(async () => {
      const actionResult = await deleteProductAction(productId)
      setResult(actionResult)
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
