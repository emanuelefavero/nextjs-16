import Link from 'next/link'
import { SLUGS } from './slugs'

export default async function Page() {
  return (
    <>
      <h1>MDX Blog</h1>

      <ul className='flex flex-col gap-2'>
        {SLUGS.map((slug) => (
          <li key={slug}>
            <Link href={`/mdx-blog/${slug}`}>
              {slug.charAt(0).toUpperCase() + slug.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
