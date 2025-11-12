import type { Product } from '@/types/products'

const COLUMNS = ['Product', 'Quantity', 'Category']

type Props = {
  products: Product[]
}

export function ProductsTable({ products }: Props) {
  return (
    <div className='relative max-w-prose overflow-x-auto rounded-lg shadow-sm'>
      <table className='w-full text-left text-sm text-neutral-600 rtl:text-right dark:text-neutral-400'>
        <thead className='border-b border-neutral-500/20 bg-primary/20 text-foreground text-xs uppercase'>
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
            <tr
              key={`product-${product.id}`}
              className='odd:bg-background even:bg-neutral-50 odd:dark:bg-background even:dark:bg-neutral-800/20'
            >
              <td className='px-6 py-4 font-medium whitespace-nowrap text-neutral-900 dark:text-white'>
                {product.name}
              </td>
              <td className='px-6 py-4'>{product.quantity}</td>
              <td className='px-6 py-4'>{product.category || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
