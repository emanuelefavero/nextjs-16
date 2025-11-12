import { Suspense } from 'react'
import { Products } from './products'

export default function Page() {
  return (
    <>
      <h1>DB Mutations</h1>

      <Suspense fallback={<p>Loading products...</p>}>
        <Products />
      </Suspense>
    </>
  )
}
