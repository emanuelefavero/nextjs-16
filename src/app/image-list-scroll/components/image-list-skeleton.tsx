import { IMAGE_LIST_CONFIG } from '@/app/image-list-scroll/config'

const { BATCH_SIZE } = IMAGE_LIST_CONFIG

/**
 * ImageListSkeleton component that displays loading placeholders.
 * Shows a grid of skeleton items matching the expected batch size.
 */
export function ImageListSkeleton() {
  return (
    <div className='flex flex-col gap-8 p-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {/* Generate skeleton items for two batches to fill viewport */}
        {Array.from({ length: BATCH_SIZE * 2 }).map((_, index) => (
          <div
            key={index}
            className='relative aspect-video w-full animate-pulse overflow-hidden rounded-lg bg-primary/20'
          >
            <div className='absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-xs text-white'>
              Loading...
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
