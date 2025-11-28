export type Product = {
  id: string
  name: string
  quantity: number
  category?: string
  status: ProductStatus
}

export type NewProduct = Omit<Product, 'id' | 'status'>
export type ProductId = Product['id']
export type ProductQuantity = Product['quantity']
export type ProductQuantityOperation = 'increment' | 'decrement'
export type ProductStatus =
  | 'IN_STOCK'
  | 'CHECKED_OUT'
  | 'MAINTENANCE'
  | 'DISCONTINUED'
export type Products = Product[]
