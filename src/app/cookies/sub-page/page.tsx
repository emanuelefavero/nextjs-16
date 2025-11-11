import { Suspense } from 'react'
import Views from './views'

export default async function Page() {
  return (
    <>
      <h1>Cookies Sub Page</h1>
      <Suspense fallback={<p>Loading views...</p>}>
        <Views />
      </Suspense>
    </>
  )
}
