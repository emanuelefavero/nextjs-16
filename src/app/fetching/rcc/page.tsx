import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1>React Client Components Fetching</h1>

      <ul>
        <li>
          <Link href='/fetching/rcc/use'>RCC Fetching with use</Link>
        </li>
      </ul>
    </>
  )
}
