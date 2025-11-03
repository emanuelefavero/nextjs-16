import Link from 'next/link'

export function Header() {
  return (
    <header className='flex gap-2 bg-gray-500/30'>
      <Link href='/' className='hover:underline'>
        Home
      </Link>
      <Link href='/test' className='hover:underline'>
        Test Page
      </Link>
    </header>
  )
}
