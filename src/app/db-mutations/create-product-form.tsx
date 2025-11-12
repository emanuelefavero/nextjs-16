import { SubmitButton } from '@/components/shared/submit-button'
import { useId } from 'react'
import { createProductAction } from './actions'

export function CreateProductForm() {
  const id = useId()
  const nameId = `${id}-name`
  const quantityId = `${id}-quantity`
  const categoryId = `${id}-category`

  return (
    <form action={createProductAction}>
      <div>
        <label htmlFor={nameId}>Name:</label>
        <input type='text' id={nameId} name='name' required />
      </div>
      <div>
        <label htmlFor={quantityId}>Quantity:</label>
        <input type='number' id={quantityId} name='quantity' required />
      </div>
      <div>
        <label htmlFor={categoryId}>Category:</label>
        <input type='text' id={categoryId} name='category' />
      </div>
      <SubmitButton>Add Product</SubmitButton>
    </form>
  )
}
