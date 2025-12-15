import { cn } from '@/lib/utils'

type LoadingIndicatorProps = React.ComponentProps<'div'> & {
  isLoading: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: string // e.g., 'border-blue-500'
}

export function LoadingIndicator({
  isLoading = false,
  size = 'md',
  color = 'border-foreground',
  className,
  ...props
}: LoadingIndicatorProps) {
  if (!isLoading) return null

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  } as const

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-b-2',
        sizeClasses[size],
        color,
        className,
      )}
      aria-label='Loading'
      role='status'
      {...props}
    />
  )
}
