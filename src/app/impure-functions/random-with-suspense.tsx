'use client'

import { use } from 'react'

const browserReadyPromise =
  typeof window === 'undefined'
    ? new Promise<void>(() => {})
    : new Promise<void>((resolve) => {
        window.setTimeout(resolve, 0)
      })

export function RandomWithSuspense() {
  use(browserReadyPromise)

  // eslint-disable-next-line react-hooks/purity -- This route intentionally demonstrates Next.js's Suspense escape hatch for render-time randomness.
  const hue = Math.floor(Math.random() * 360)
  const chipStyle = {
    backgroundColor: `hsl(${hue} 80% 92%)`,
    borderColor: `hsl(${hue} 75% 45%)`,
    color: `hsl(${hue} 70% 25%)`,
  }

  return (
    <div className='rounded-xl border border-foreground/15 bg-background p-4'>
      <p className='text-sm text-foreground/70'>
        This component suspends until the browser is ready, then calls{' '}
        <code>Math.random()</code> during render. That lets Suspense hydrate the
        fallback first and reveal the random UI on the client.
      </p>

      <div
        className='mt-3 inline-flex rounded-full border px-3 py-1 font-mono text-sm'
        style={chipStyle}
      >
        Render-time hue: {hue}
      </div>
    </div>
  )
}
