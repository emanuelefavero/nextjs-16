'use client'

import { IMAGE_LIST_CONFIG } from '@/app/image-list-scroll/config'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { EndMessage } from './end-message'
import { ImageItem } from './image-item'
import { Sentinel } from './sentinel'

const { INITIAL_ID, MAX_ID, BATCH_SIZE } = IMAGE_LIST_CONFIG

type Props = {
  batchSize?: number
}

// * Component that displays a list of images with infinite scroll, loading more images as the user scrolls down.

export function ImageList({ batchSize = BATCH_SIZE }: Props) {
  const [isPending, startTransition] = useTransition()

  // Start with IDs 10 to 18
  const [ids, setIds] = useState<number[]>(
    Array.from({ length: batchSize }, (_, i) => INITIAL_ID + i),
  )

  const canLoadMore = ids[ids.length - 1] < MAX_ID

  // Use the custom hook to detect when the bottom is reached
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0, // ? Trigger as soon as the sentinel enters the viewport
    rootMargin: '100px', // ? Start loading before reaching the bottom
  })

  // Load more images when the bottom is intersecting
  const loadMore = useCallback(() => {
    setIds((prevIds) => {
      const lastId = prevIds[prevIds.length - 1]

      // Stop if we've reached the limit
      if (lastId >= MAX_ID) return prevIds

      // Calculate next batch
      const nextIds = Array.from(
        { length: batchSize },
        (_, i) => lastId + 1 + i,
      ).filter((id) => id <= MAX_ID)

      return [...prevIds, ...nextIds]
    })
  }, [batchSize])

  // Trigger loadMore when isIntersecting changes to true
  useEffect(() => {
    if (isIntersecting) startTransition(() => loadMore())
  }, [isIntersecting, loadMore])

  // Post-load check: If content doesn't fill viewport, load more until it does
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      document.body.scrollHeight <= window.innerHeight &&
      canLoadMore &&
      !isPending
    ) {
      startTransition(() => loadMore())
    }
  }, [canLoadMore, isPending, loadMore])

  return (
    <div className='flex flex-col gap-8 p-8'>
      {/* Image grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {ids.map((id, index) => (
          <ImageItem key={id} id={id} index={index} batchSize={batchSize} />
        ))}
      </div>

      {/* Sentinel element (hidden element that triggers loading more) + Loading Indicator */}
      <Sentinel ref={ref} isVisible={canLoadMore} isPending={isPending} />

      {/* Only shown when all images are loaded */}
      <EndMessage
        isVisible={!canLoadMore}
        message="You've reached the end of the list."
      />
    </div>
  )
}
