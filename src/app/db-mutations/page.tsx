import { Suspense } from 'react'
import { ActionResultModal } from './components/action-result-modal'
import { CreateProductForm } from './components/create-product-form'
import { Products } from './components/products'

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
