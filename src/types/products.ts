export type Product = {
  id: string
  name: string
  quantity: number
  category?: string
}

export type NewProduct = Omit<Product, 'id'>
export type ProductId = Product['id']
export type ProductQuantity = Product['quantity']
export type Products = Product[]
