'use client'

import { INTERSECTION_CONFIG } from '@/app/image-list-scroll/config'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect, useTransition } from 'react'

const { THRESHOLD, ROOT_MARGIN } = INTERSECTION_CONFIG

type Options = {
  loadMore: () => void
  isFullyLoaded: boolean
}

export function useInfiniteScroll({ loadMore, isFullyLoaded }: Options) {
  const [isPending, startTransition] = useTransition()

  // Detect when the sentinel enters the viewport
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: THRESHOLD,
    rootMargin: ROOT_MARGIN,
  })

  // Trigger loadMore when isIntersecting changes to true
  useEffect(() => {
    if (isIntersecting && !isFullyLoaded) {
      startTransition(() => loadMore())
    }
  }, [isIntersecting, isFullyLoaded, loadMore])

  // Post-load check: If content doesn't fill viewport, load more until it does
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
