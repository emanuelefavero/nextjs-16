import { Suspense } from 'react'
import { ActionResultModal } from './action-result-modal'
import { CreateProductForm } from './create-product-form'
import { Products } from './products'

export default function Page() {
  return (
    <>
      <h1>DB Mutations</h1>
      <ActionResultModal />

      <CreateProductForm />

      <Suspense fallback={<p>Loading products...</p>}>
        <Products />
      </Suspense>
    </>
  )
}
