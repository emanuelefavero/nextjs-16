import { createProductAction } from '@/app/db-mutations/actions'
import { SubmitButton } from '@/components/shared/submit-button'
import { useId } from 'react'

export function CreateProductForm() {
  const id = useId()
  const nameId = `${id}-name`
  const quantityId = `${id}-quantity`
  const categoryId = `${id}-category`

  return (
    <div>
      <h2>Add a New Product</h2>

      <form
        action={createProductAction}
        className='flex flex-col gap-2 py-4 sm:flex-row'
      >
        <div>
          <label htmlFor={nameId} className='sr-only'>
            Name:
          </label>
          <input
            type='text'
            placeholder='Product name'
            id={nameId}
            name='name'
            required
            className='w-full sm:w-auto'
          />
        </div>
        <div>
          <label htmlFor={quantityId} className='sr-only'>
            Quantity:
          </label>
          <input
            type='number'
            placeholder='Quantity'
            id={quantityId}
            name='quantity'
            required
            className='w-full sm:w-auto'
          />
        </div>
        <div>
          <label htmlFor={categoryId} className='sr-only'>
            Category:
          </label>
          <input
            type='text'
            placeholder='Category'
            id={categoryId}
            name='category'
            className='w-full sm:w-auto'
          />
        </div>
        <SubmitButton className='flex min-h-10 w-full min-w-[62px] items-center justify-center sm:w-fit'>
          Add
        </SubmitButton>
      </form>
    </div>
  )
}
