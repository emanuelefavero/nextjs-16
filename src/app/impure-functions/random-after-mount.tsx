'use client'

import { useEffect, useState } from 'react'

export function RandomAfterMount() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      // Generate a random number between 1 and 100 after the component mounts
      setRandomNumber(Math.floor(Math.random() * 100) + 1)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <p className='font-mono text-2xl text-primary'>
      {randomNumber === null
        ? 'Generating random number on the client...'
        : randomNumber}
    </p>
  )
}
