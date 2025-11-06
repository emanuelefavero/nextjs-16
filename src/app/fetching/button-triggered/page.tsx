import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1>Button Triggered Fetching</h1>
      <ul>
        <li>
          <Link href='/fetching/button-triggered/actions-use-transition'>
            Fetching with Actions and useTransition
          </Link>
        </li>
      </ul>
    </>
  )
}
