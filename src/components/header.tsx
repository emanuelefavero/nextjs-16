'use client'

import { BackButton } from '@/components/shared/back-button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className='flex items-center gap-2 border-b border-neutral-500/30 px-4 py-2'>
      {pathname !== '/' ? (
        <>
          <Link href='/'>Home</Link>
          <BackButton>Back</BackButton>
        </>
      ) : (
        <div className='text-3xl font-bold'>Home</div>
      )}
    </header>
  )
}
