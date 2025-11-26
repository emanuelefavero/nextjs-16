'use client'

import { cn } from '@/lib/utils'
import type { Product } from '@/types/products'

type QuantityButtonProps = React.ComponentPropsWithRef<'button'> & {
  // TODO operation: ProductQuantityOperation
}

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
  return (
    <div className='flex items-center gap-2'>
      <QuantityButton>-</QuantityButton>
      <div className='min-w-[3ch] text-center'>{product.quantity}</div>
      <QuantityButton>+</QuantityButton>
    </div>
  )
}
