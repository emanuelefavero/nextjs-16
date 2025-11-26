import type { Product } from '@/types/products'
import { DeleteProductButton } from './delete-product-button'
import { ProductRow } from './product-row'

const COLUMNS = ['Product', 'Quantity', 'Category', 'Actions']

type Props = {
  products: Product[]
}

export function ProductsTable({ products }: Props) {
  return (
    <div className='relative max-w-prose overflow-x-auto rounded-lg shadow-sm'>
      <table className='w-full text-left text-sm text-neutral-600 rtl:text-right dark:text-neutral-400'>
        <thead className='border-b border-neutral-500/20 bg-primary/20 text-xs text-foreground uppercase'>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column} scope='col' className='px-6 py-3'>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-neutral-500/20'>
          {products.map((product) => (
            <ProductRow key={`product-${product.id}`} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
