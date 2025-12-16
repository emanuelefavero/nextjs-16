'use client'

import { useMemo } from 'react'

// Custom hooks and store
import { useInfiniteScroll } from '@/app/image-list-scroll/hooks/useInfiniteScroll'
import { useImageListStore } from '@/app/image-list-scroll/store/useImageListStore'

// Component imports
import { EndMessage } from './end-message'
import { ImageItem } from './image-item'
import { Sentinel } from './sentinel'

/**
 * ImageList component that renders a responsive grid of images with infinite scroll functionality.
 * Automatically fetches more content as the user scrolls near the bottom.
 *
 * @example
 * <ImageList />
 */
export function ImageList() {
  // Select specific state properties to avoid unnecessary re-renders
  const ids = useImageListStore((state) => state.ids)
  const loadMore = useImageListStore((state) => state.loadMore)
  const isFullyLoaded = useImageListStore((state) => state.isFullyLoaded)

  const { ref, isPending } = useInfiniteScroll({ loadMore, isFullyLoaded })

  // Memoize image items to prevent re-rendering on every state change
  const imageItems = useMemo(
    () => ids.map((id, index) => <ImageItem key={id} id={id} index={index} />),
    [ids],
  )

  return (
    <div className='flex flex-col gap-8 p-8'>
      {/* Main image grid with responsive columns */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {imageItems}
      </div>

      {/* Intersection observer sentinel triggers loading when scrolled into view */}
      <Sentinel ref={ref} isPending={isPending} />

      {/* End message displays only after all images are loaded */}
      <EndMessage message="You've reached the end of the list." />
    </div>
  )
}
