export type Product = {
  id: string
  name: string
  quantity: number
  category?: string
}

export type NewProduct = Omit<Product, 'id'>

export type Products = Product[]
