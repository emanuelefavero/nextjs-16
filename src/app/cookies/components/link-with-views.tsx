'use client'

import { cx } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { incrementViews } from '../actions'
import { LINK_BUTTON_STYLES } from './styles'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

export function LinkWithViews({ href, children, className }: Props) {
  const router = useRouter()

  const handleClick = async () => {
    await incrementViews()
    router.push(href)
  }

  return (
    <button onClick={handleClick} className={cx(LINK_BUTTON_STYLES, className)}>
      {children}
    </button>
  )
}
