'use client'

import { useInfiniteScroll } from '@/app/image-list-scroll/hooks/useInfiniteScroll'
import { useImageListStore } from '@/app/image-list-scroll/store/useImageListStore'
import { EndMessage } from './end-message'
import { ImageItem } from './image-item'
import { Sentinel } from './sentinel'

// * Component that displays a list of images with infinite scroll, loading more images as the user scrolls down.

export function ImageList() {
  const { ids, loadMore, isFullyLoaded } = useImageListStore()
  const { ref, isPending } = useInfiniteScroll({ loadMore, isFullyLoaded })

  return (
    <div className='flex flex-col gap-8 p-8'>
      {/* Image grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {ids.map((id, index) => (
          <ImageItem key={id} id={id} index={index} />
        ))}
      </div>

      {/* Sentinel element (hidden element that triggers loading more) + Loading Indicator */}
      <Sentinel ref={ref} isPending={isPending} />

      {/* Only shown when all images are loaded */}
      <EndMessage message="You've reached the end of the list." />
    </div>
  )
}
