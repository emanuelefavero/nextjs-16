'use client'

import { useRouter } from 'next/navigation'
import { incrementViews } from '../actions'

type Props = {
  href: string
  children: React.ReactNode
}

export function LinkWithViews({ href, children }: Props) {
  const router = useRouter()

  const handleClick = async () => {
    await incrementViews()
    router.push(href)
  }

  return <button onClick={handleClick}>{children}</button>
}
