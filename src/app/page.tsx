import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <h1>Next.js 16</h1>

      <ul className='flex flex-col gap-2'>
        <li>
          <Link href='/test'>Test Page</Link>
        </li>
        <li>
          <Link href='/mdx-blog'>MDX Blog</Link>
        </li>
        <li>
          <Link href='/mdx-page'>MDX Page</Link>
        </li>
        <li>
          <Link href='/image-slider'>Image Slider</Link>
        </li>
        <li>
          <Link href='/use-cache'>use cache</Link>
        </li>
        <li>
          <Link href='/fetching'>Fetching</Link>
        </li>
        <li>
          <Link href='/cookies'>Cookies</Link>
        </li>
        <li>
          <Link href='/connection'>Connection</Link>
        </li>
      </ul>
    </>
  )
}
