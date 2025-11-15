'use client'

import { useEffect, useState } from 'react'

/**
 * A hook to get the current scroll position of a given element or the window.
 *
 * @param ref - A React ref object pointing to the target element. If not provided, the window scroll position is used.
 * @returns An object containing the current scrollX and scrollY positions.
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const { scrollX, scrollY } = useScrollPosition(ref)
 * // OR
 * // const { scrollX, scrollY } = useScrollPosition() // window scroll position
 *
 * // DO SOMETHING WITH scrollX AND scrollY
 *
 * return <div ref={ref}>...</div>
 * ```
 */

type Props = {
  ref?: React.RefObject<HTMLElement> | null
}

type ReturnType = {
  scrollX: number
  scrollY: number
}

export function useScrollPosition({ ref }: Props): ReturnType {
  const [scrollX, setScrollX] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const target = ref?.current || window

    const handleScroll = () => {
      if (ref?.current) {
        setScrollX(ref.current.scrollLeft)
        setScrollY(ref.current.scrollTop)
      } else {
        setScrollX(window.scrollX)
        setScrollY(window.scrollY)
      }
    }

    target.addEventListener('scroll', handleScroll)

    handleScroll() // ? Initialize scroll position on mount

    return () => target.removeEventListener('scroll', handleScroll)
  }, [ref])

  return { scrollX, scrollY }
}
