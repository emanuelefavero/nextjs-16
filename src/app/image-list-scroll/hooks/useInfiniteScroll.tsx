'use client'

import { INTERSECTION_CONFIG } from '@/app/image-list-scroll/config'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect, useTransition } from 'react'

const { THRESHOLD, ROOT_MARGIN } = INTERSECTION_CONFIG

type Options = {
  loadMore: () => void
  isFullyLoaded: boolean
}

/**
 * Custom hook for implementing infinite scroll functionality.
 * Uses intersection observer to detect when to load more content.
 */
export function useInfiniteScroll({ loadMore, isFullyLoaded }: Options) {
  const [isPending, startTransition] = useTransition()

  // Set up intersection observer for scroll detection
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: THRESHOLD,
    rootMargin: ROOT_MARGIN,
  })

  // Load more content when sentinel enters viewport
  useEffect(() => {
    if (isIntersecting && !isFullyLoaded) {
      startTransition(() => loadMore())
    }
  }, [isIntersecting, isFullyLoaded, loadMore])

  // Ensure content fills viewport by loading more if needed after initial load
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      document.body.scrollHeight <= window.innerHeight &&
      !isFullyLoaded &&
      !isPending
    ) {
      startTransition(() => loadMore())
    }
  }, [isFullyLoaded, isPending, loadMore])

  return { ref, isPending }
}
