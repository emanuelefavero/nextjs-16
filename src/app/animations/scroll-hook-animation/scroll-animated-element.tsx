'use client'

import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useWindowDimensions } from '@/hooks/useWindowDimensions'

// * A component that moves horizontally based on the vertical scroll position
// TIP: The element will reach the right edge of the viewport when scrolled to the bottom of the page no matter the viewport size

export function ScrollAnimatedElement() {
  const { scrollY } = useScrollPosition({ ref: null })
  const {
    width: viewportWidth,
    height: viewportHeight,
    scrollHeight, // total height of the document (including the part not visible in the viewport)
  } = useWindowDimensions()

  // Calculate the maximum scrollable distance
  const maxScroll = scrollHeight - viewportHeight

  // Define the width of the animated element (adjust as needed!)
  const elementWidth = 160 // w-40 in Tailwind

  // Calculate the scroll progress (0 to 1)
  const progress = maxScroll > 0 ? scrollY / maxScroll : 0

  // Calculate the horizontal translation based on scroll progress
  const translateX = progress * (viewportWidth - elementWidth)

  return (
    <div
      className='fixed bottom-0 left-0 flex w-40 items-center justify-center rounded-lg bg-primary p-1 text-center text-white'
      style={{
        transform: `translateX(${translateX}px)`,
        transition: 'transform 0.1s linear',
      }}
    >
      Scroll Y: {Math.round(scrollY)}px
    </div>
  )
}
