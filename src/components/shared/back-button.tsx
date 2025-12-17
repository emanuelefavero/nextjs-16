'use client'

import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useEffectEvent, useState } from 'react'

type Props = Omit<React.ComponentProps<'button'>, 'onClick' | 'disabled'>

export function BackButton({ children, className, ...props }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [canGoBack, setCanGoBack] = useState(false)

  const checkHistoryLength = useEffectEvent(() => {
    setCanGoBack(window.history.length > 1)
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    checkHistoryLength()
  }, [pathname])

  const isVisible = pathname !== '/'

  return (
    <button
      type='button'
      className={cn(
        isVisible ? '' : 'pointer-events-none invisible',
        className,
      )}
      onClick={() => router.back()}
      disabled={!canGoBack}
      aria-label={typeof children === 'string' ? children : 'Go back'}
      {...props}
    >
      {children ?? 'Back'}
    </button>
  )
}
