'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const logoVariants = {
  home: 'cursor-default',
  link: '',
} as const

type Props = {
  className?: string
  text?: string
  icon?: React.ReactNode
}

export function Logo({ className, text = 'Home', icon }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const baseClasses = 'font-bold transition-colors duration-200'
  const variant = isHome ? logoVariants.home : logoVariants.link
  const mergedClasses = cn(baseClasses, variant, className)

  const content = (
    <>
      {icon && <span className='mr-2'>{icon}</span>}
      {text}
    </>
  )

  if (isHome) {
    return <div className={mergedClasses}>{content}</div>
  }

  return (
    <Link href='/' className={mergedClasses}>
      {content}
    </Link>
  )
}
