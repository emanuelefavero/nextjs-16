'use client'

import { cx } from '@/lib/utils'
import { useFormStatus } from 'react-dom'

type Props = React.ComponentPropsWithRef<'button'> & {}

export function SubmitButton({ children, className, ...props }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type='submit'
      className={cx(className)}
      {...props}
    >
      {children}
    </button>
  )
}
