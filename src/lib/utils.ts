import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// * cn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// * cx (simple classnames joiner)
export const cx = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ')
}
