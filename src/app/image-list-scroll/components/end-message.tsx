import { useImageListStore } from '@/app/image-list-scroll/store/useImageListStore'
import { cn } from '@/lib/utils'
import { memo } from 'react'

type Props = React.ComponentProps<'div'> & {
  message: string
}

/**
 * EndMessage component that displays a message when all images are loaded.
 * Memoized to prevent unnecessary re-renders.
 */
export const EndMessage = memo(function EndMessage({
  message,
  className,
  ...props
}: Props) {
  const isFullyLoaded = useImageListStore((state) => state.isFullyLoaded)

  // Only render when all images have been loaded
  if (!isFullyLoaded) return null

  return (
    <div
      className={cn('py-4 text-center text-foreground', className)}
      {...props}
    >
      {message}
    </div>
  )
})
