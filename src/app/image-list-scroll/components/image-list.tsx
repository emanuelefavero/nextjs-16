'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { ImageItem } from './image-item'

const INITIAL_ID = 10
const MAX_ID = 90

type Props = {
  batchSize?: number
}

// * Component that displays a list of images with infinite scroll, loading more images as the user scrolls down.

export function ImageList({ batchSize = 9 }: Props) {
  const [isPending, startTransition] = useTransition()

  // Start with IDs 10 to 18
  const [ids, setIds] = useState<number[]>(
    Array.from({ length: batchSize }, (_, i) => INITIAL_ID + i),
  )

  // Use the custom hook to detect when the bottom is reached
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0, // * Trigger as soon as the sentinel enters the viewport
    rootMargin: '100px', // * Start loading before reaching the bottom
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
    if (isIntersecting) {
      startTransition(() => loadMore())
    }
  }, [isIntersecting, loadMore])

  // Post-load check: If content doesn't fill viewport, load more until it does
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      document.body.scrollHeight <= window.innerHeight &&
      ids[ids.length - 1] < MAX_ID &&
      !isPending
    ) {
      startTransition(() => loadMore())
    }
  }, [ids, isPending, loadMore])

  return (
    <div className='flex flex-col gap-8 p-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {ids.map((id, index) => (
          <ImageItem key={id} id={id} index={index} batchSize={batchSize} />
        ))}
      </div>

      {/* Sentinel element - invisible trigger at the bottom */}
      {ids[ids.length - 1] < MAX_ID && (
        <div ref={ref} className='flex h-20 w-full items-center justify-center'>
          {isPending && (
            <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-foreground'></div>
          )}
        </div>
      )}

      {/* Only shown when all images are loaded */}
      {ids[ids.length - 1] >= MAX_ID && (
        <div className='py-4 text-center text-foreground'>
          You{"'"}ve reached the end of the list.
        </div>
      )}
    </div>
  )
}
