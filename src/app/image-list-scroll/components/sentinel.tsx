import { LoadingIndicator } from '@/components/shared/loading-indicator'
import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'div'> & {
  isVisible: boolean
  isPending: boolean
}

export function Sentinel({ isVisible, isPending, className, ...props }: Props) {
  if (!isVisible) return null

  return (
    <div
      className={cn('flex h-20 w-full items-center justify-center', className)}
      {...props}
    >
      <LoadingIndicator isLoading={isPending} />
    </div>
  )
}
