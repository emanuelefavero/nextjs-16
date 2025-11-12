import type { Product } from '@/types/products'

type Props = {
  products: Product[]
}

export function ProductsList({ products }: Props) {
  return (
    <ul>
      {products.map((product) => (
        <li key={`product-${product.id}`}>
          <h2>{product.name}</h2>
          <p>Quantity: {product.quantity}</p>
          {product.category && <p>Category: {product.category}</p>}
        </li>
      ))}
    </ul>
  )
}
