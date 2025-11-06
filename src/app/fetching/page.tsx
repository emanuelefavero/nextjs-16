import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1>Fetching</h1>

      <ul>
        <li>
          <Link href='/fetching/rsc'>RSC Fetching</Link>
        </li>
        <li>
          <Link href='/fetching/rcc'>RCC Fetching</Link>
        </li>
        <li>
          <Link href='/fetching/button-triggered'>
            Button Triggered Fetching
          </Link>
        </li>
      </ul>
    </>
  )
}
