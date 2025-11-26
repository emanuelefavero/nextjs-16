import type { Product } from '@/types/products'
import { DeleteProductButton } from './delete-product-button'
import { ProductQuantity } from './product-quantity'

type Props = {
  product: Product
}

export function ProductRow({ product }: Props) {
  return (
    <tr className='odd:bg-background even:bg-neutral-50 odd:dark:bg-background even:dark:bg-neutral-800/20'>
      <td className='px-6 py-4 font-medium whitespace-nowrap text-neutral-900 dark:text-white'>
        {product.name}
      </td>
      <td className='px-6 py-4'>
        <ProductQuantity product={product} />
      </td>
      <td className='px-6 py-4'>{product.category || 'N/A'}</td>
      <td className='px-6 py-4'>
        <DeleteProductButton productId={product.id} />
      </td>
    </tr>
  )
}
