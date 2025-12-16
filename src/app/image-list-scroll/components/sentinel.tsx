import { useImageListStore } from '@/app/image-list-scroll/store/useImageListStore'
import { LoadingIndicator } from '@/components/shared/loading-indicator'
import { cn } from '@/lib/utils'
import { memo } from 'react'

type Props = React.ComponentProps<'div'> & {
  isPending: boolean
}

/**
 * Sentinel component used as an intersection observer target for infinite scroll.
 * Displays a loading indicator when fetching more content. Memoized for performance.
 */
export const Sentinel = memo(function Sentinel({
  isPending,
  className,
  ...props
}: Props) {
  const isFullyLoaded = useImageListStore((state) => state.isFullyLoaded)

  // Don't render sentinel when all content is loaded
  if (isFullyLoaded) return null

  return (
    <div
      className={cn('flex h-20 w-full items-center justify-center', className)}
      {...props}
    >
      <LoadingIndicator isLoading={isPending} />
    </div>
  )
})
