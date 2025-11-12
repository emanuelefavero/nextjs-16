import { Suspense } from 'react'
import { CreateProductForm } from './create-product-form'
import { Products } from './products'

export default function Page() {
  return (
    <>
      <h1>DB Mutations</h1>

      <CreateProductForm />

      <Suspense fallback={<p>Loading products...</p>}>
        <Products />
      </Suspense>
    </>
  )
}
