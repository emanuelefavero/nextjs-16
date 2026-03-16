'use client'

import { useEffect, useState } from 'react'

export function RandomAfterMount() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setRandomNumber(Math.random())
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className='rounded-xl border border-foreground/15 bg-background p-4'>
      <p className='text-sm text-foreground/70'>
        Initial render stays deterministic, then the browser generates the
        random value after hydration.
      </p>

      <p className='mt-3 font-mono text-lg'>
        {randomNumber === null
          ? 'Generating random number on the client...'
          : randomNumber.toFixed(6)}
      </p>
    </div>
  )
}
