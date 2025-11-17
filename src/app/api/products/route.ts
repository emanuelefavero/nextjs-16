import { getProducts } from '@/lib/db/queries'

export async function GET() {
  // TIP: The `getProducts` function is cached: @see @/lib/db/queries.ts
  const products = await getProducts()
  return Response.json(products)
}
