'use client'

import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'
import { SpinnerIcon } from '../icons/SpinnerIcon'

type Props = React.ComponentPropsWithRef<'button'> & {}

export function SubmitButton({ children, className, ...props }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type='submit'
      className={cn('px-4 py-[.4rem]', className)}
      {...props}
    >
      {pending ? <SpinnerIcon /> : children}
    </button>
  )
}
