import { Suspense } from 'react'
import { Users } from './users'

export default function Page() {
  return (
    <>
      <h1>Fetching in Server Components</h1>

      <Suspense fallback={<p>Loading users...</p>}>
        <Users />
      </Suspense>
    </>
  )
}
