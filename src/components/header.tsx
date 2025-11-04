'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className='flex items-center gap-2 border-b border-neutral-500/30 px-4 py-2'>
      {pathname !== '/' ? (
        <>
          <Link href='/'>Home</Link>

          <button type='button' onClick={() => router.back()}>
            Back
          </button>
        </>
      ) : (
        <div className='text-3xl font-bold'>Home</div>
      )}
    </header>
  )
}
