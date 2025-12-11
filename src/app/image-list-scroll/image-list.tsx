'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'
import { startTransition, useCallback, useEffect, useState } from 'react'

// TODO find alternative to call loadMore without the timer without getting useEffect warning

const INITIAL_ID = 10
const MAX_ID = 90
const BATCH_SIZE = 9

// * Component that displays a list of images with infinite scroll, loading more images as the user scrolls down.

export function ImageList() {
  // Start with IDs 10 to 19
  const [ids, setIds] = useState<number[]>(
    Array.from({ length: BATCH_SIZE }, (_, i) => INITIAL_ID + i),
  )

  // Use the custom hook to detect when the bottom is reached
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1, // * Trigger when 10% of the target is visible
  })

  // Load more images when the bottom is intersecting
  const loadMore = useCallback(() => {
    setIds((prevIds) => {
      const lastId = prevIds[prevIds.length - 1]

      // Stop if we've reached the limit
      if (lastId >= MAX_ID) return prevIds

      // Calculate next batch
      const nextIds = Array.from(
        { length: BATCH_SIZE },
        (_, i) => lastId + 1 + i,
      ).filter((id) => id <= MAX_ID)

      return [...prevIds, ...nextIds]
    })
  }, [])

  // Trigger loadMore when isIntersecting changes to true
  useEffect(() => {
    if (isIntersecting) {
      startTransition(() => loadMore())
    }
  }, [isIntersecting, loadMore])

  return (
    <div className='flex flex-col gap-8 p-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {ids.map((id) => (
          <div
            key={id}
            className='relative aspect-video w-full animate-fade-in overflow-hidden rounded-lg bg-gray-100'
          >
            <Image
              src={`https://picsum.photos/id/${id}/800/600`}
              alt={`Image ${id}`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <div className='absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-xs text-white'>
              ID: {id}
            </div>
          </div>
        ))}
      </div>

      {/* Sentinel element - invisible trigger at the bottom */}
      {ids[ids.length - 1] < MAX_ID && (
        <div ref={ref} className='flex h-20 w-full items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-foreground'></div>
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
