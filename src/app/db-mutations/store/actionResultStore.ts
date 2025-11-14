import type { ActionResult } from '@/app/db-mutations/actions'
import type { Product } from '@/types/products'
import { create } from 'zustand'

export type ActionResultState = {
  result: ActionResult<Product> | null
  show: boolean
  setResult: (result: ActionResult<Product> | null) => void
  setShow: (show: boolean) => void
  reset: () => void
}

export const useActionResultStore = create<ActionResultState>((set) => ({
  result: null,
  show: false,
  setResult: (result) => set({ result, show: result !== null }),
  setShow: (show) => set({ show }),
  reset: () => set({ result: null, show: false }),
}))
