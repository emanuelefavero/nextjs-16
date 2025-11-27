'use client'

import { MinusIcon } from '@/components/icons/MinusIcon'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { SpinnerIcon } from '@/components/icons/SpinnerIcon'
import { cn } from '@/lib/utils'
import type { Product, ProductQuantityOperation } from '@/types/products'
import { useOptimistic, useTransition } from 'react'
import { adjustProductQuantityAction } from './actions'

// TODO Refactor QuantityButton to a separate file
// TODO Enable and test revert on error inside handleAdjustQuantity

type QuantityButtonProps = React.ComponentPropsWithRef<'button'> & {}

function QuantityButton({
  children,
  className,
  ...props
}: QuantityButtonProps) {
  return (
    <button
      className={cn(
        'border border-danger-foreground/20 bg-danger px-4 py-[.4rem] disabled:opacity-75',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

type Props = {
  product: Product
}

export function ProductQuantity({ product }: Props) {
  const [pending, startTransition] = useTransition()

  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
    product.quantity,
    (current, adjustment: number) => current + adjustment,
  )

  const handleAdjustQuantity = (operation: ProductQuantityOperation) => {
    const adjustment =
      operation === 'increment' ? 1 : product.quantity > 0 ? -1 : 0

    startTransition(async () => {
      setOptimisticQuantity(adjustment)
      const result = await adjustProductQuantityAction(product.id, operation)
      if ('error' in result) {
        console.error(result.error)
        // Optionally revert: setOptimisticQuantity(-adjustment)
      }
    })
  }

  return (
    <div className='flex items-center gap-2'>
      <QuantityButton
        onClick={() => handleAdjustQuantity('decrement')}
        disabled={pending}
      >
        {pending ? (
          <SpinnerIcon />
        ) : (
          <MinusIcon strokeClass='stroke-danger-foreground' />
        )}
      </QuantityButton>
      <div className='min-w-[3ch] text-center'>{optimisticQuantity}</div>
      <QuantityButton
        onClick={() => handleAdjustQuantity('increment')}
        disabled={pending}
      >
        {pending ? (
          <SpinnerIcon />
        ) : (
          <PlusIcon strokeClass='stroke-danger-foreground' />
        )}
      </QuantityButton>
    </div>
  )
}
