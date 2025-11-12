import { SubmitButton } from '@/components/shared/submit-button'
import { createProductAction } from './actions'

export function CreateProductForm() {
  return (
    <form action={createProductAction}>
      <div>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' required />
      </div>
      <div>
        <label htmlFor='quantity'>Quantity:</label>
        <input type='number' id='quantity' name='quantity' required />
      </div>
      <div>
        <label htmlFor='category'>Category:</label>
        <input type='text' id='category' name='category' />
      </div>
      <SubmitButton>Add Product</SubmitButton>
    </form>
  )
}
