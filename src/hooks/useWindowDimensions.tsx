'use client'

import { useEffect, useState } from 'react'

/**
 * A hook to get the current viewport dimensions and document scroll dimensions.
 *
 * @returns An object containing the viewport width and height, and document scrollWidth and scrollHeight.
 */

type Dimensions = {
  width: number
  height: number
  scrollWidth: number
  scrollHeight: number
}

export function useWindowDimensions(): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    scrollWidth: 0,
    scrollHeight: 0,
  })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return dimensions
}
