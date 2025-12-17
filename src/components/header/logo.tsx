'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  className?: string
  homeClassName?: string
  text?: string
  icon?: React.ReactNode
}

export function Logo({ className, homeClassName, text = 'Home', icon }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const baseClasses = 'text-3xl font-bold transition-colors duration-200'
  const linkClasses = cn(baseClasses, className)
  const homeClasses = cn(baseClasses, 'cursor-default', homeClassName)

  const content = (
    <>
      {icon && <span className='mr-2'>{icon}</span>}
      {text}
    </>
  )

  if (isHome) {
    return <div className={homeClasses}>{content}</div>
  }

  return (
    <Link href='/' className={linkClasses}>
      {content}
    </Link>
  )
}
