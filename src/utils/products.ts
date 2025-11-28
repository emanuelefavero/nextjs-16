import type {
  ProductStatusLabel as Label,
  ProductStatus,
} from '@/types/products'

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, Label> = {
  IN_STOCK: 'In Stock',
  CHECKED_OUT: 'Checked Out',
  MAINTENANCE: 'Maintenance',
  DISCONTINUED: 'Discontinued',
}
