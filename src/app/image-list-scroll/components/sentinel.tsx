import { useImageListStore } from '@/app/image-list-scroll/store/useImageListStore'
import { LoadingIndicator } from '@/components/shared/loading-indicator'
import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'div'> & {
  isPending: boolean
}

export function Sentinel({ isPending, className, ...props }: Props) {
  const isFullyLoaded = useImageListStore((state) => state.isFullyLoaded)
  if (isFullyLoaded) return null

  return (
    <div
      className={cn('flex h-20 w-full items-center justify-center', className)}
      {...props}
    >
      <LoadingIndicator isLoading={isPending} />
    </div>
  )
}
