'use client'

import { SpinnerIcon } from '@/components/icons/SpinnerIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import type { Product } from '@/types/products'
import { useState, useTransition } from 'react'
import { deleteProductAction, type ActionResult } from './actions'

type Props = {
  productId: string
}

export function DeleteProductButton({ productId }: Props) {
  const [result, setResult] = useState<ActionResult<Product> | null>(null)
  const [pending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      const actionResult = await deleteProductAction(productId)
      setResult(actionResult)
    })
  }

  return (
    <div>
      {result && 'error' in result && (
        <p className='text-danger-foreground'>{result.error}</p>
      )}
      {result && 'data' in result && (
        <p className='text-success-foreground'>Deleted: {result.data.name}</p>
      )}

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
    </div>
  )
}
