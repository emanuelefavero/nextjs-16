'use client'

import { useImageListStore } from '@/app/image-list-scroll/store/useImageListStore'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect, useTransition } from 'react'
import { EndMessage } from './end-message'
import { ImageItem } from './image-item'
import { Sentinel } from './sentinel'

// * Component that displays a list of images with infinite scroll, loading more images as the user scrolls down.

export function ImageList() {
  const { ids, loadMore, getLoadCompleted } = useImageListStore()
  const [isPending, startTransition] = useTransition()
  const loadCompleted = getLoadCompleted()

  // Use the custom hook to detect when the bottom is reached
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0, // ? Trigger as soon as the sentinel enters the viewport
    rootMargin: '100px', // ? Start loading before reaching the bottom
  })

  // Trigger loadMore when isIntersecting changes to true
  useEffect(() => {
    if (isIntersecting) startTransition(() => loadMore())
  }, [isIntersecting, loadMore])

  // Post-load check: If content doesn't fill viewport, load more until it does
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      document.body.scrollHeight <= window.innerHeight &&
      !loadCompleted &&
      !isPending
    ) {
      startTransition(() => loadMore())
    }
  }, [loadCompleted, isPending, loadMore])

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
