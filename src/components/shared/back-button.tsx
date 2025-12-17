'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useEffectEvent, useState } from 'react'

type Props = Omit<React.ComponentProps<'button'>, 'onClick' | 'disabled'>

export function BackButton({ children, ...props }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [canGoBack, setCanGoBack] = useState(false)

  const checkHistoryLength = useEffectEvent(() => {
    setCanGoBack(window.history.length > 1)
  })

  useEffect(() => {
    checkHistoryLength()
  }, [pathname])

  return (
    <button
      type='button'
      onClick={() => router.back()}
      disabled={!canGoBack}
      {...props}
    >
      {children ?? 'Back'}
    </button>
  )
}
