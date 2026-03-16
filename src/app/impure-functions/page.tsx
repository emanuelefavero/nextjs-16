import { Suspense } from 'react'

import { RandomAfterMount } from './random-after-mount'
import { RandomWithSuspense } from './random-with-suspense'

function RandomFallback() {
  return (
    <div className='rounded-xl border border-dashed border-foreground/20 bg-background p-4'>
      <p className='text-sm text-foreground/70'>
        Loading the client-rendered random example...
      </p>

      <div className='mt-3 inline-flex rounded-full border border-foreground/20 px-3 py-1 font-mono text-sm text-foreground/60'>
        Render-time hue: fallback
      </div>
    </div>
  )
}

export default function Page() {
  const newLocal =
    'space-y-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6'
  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-8 px-6 py-10'>
      <header className='space-y-3'>
        <h1>Impure Functions</h1>

        <p className='max-w-3xl text-base leading-7 text-foreground/75'>
          Impure functions like <code>Math.random()</code> should not run during
          prerendered client renders unless you intentionally isolate them.
          These examples show the two safe patterns to avoid hydration errors in
          Next.js 16.
        </p>
      </header>

      <section className={newLocal}>
        <div className='space-y-2'>
          <p className='text-sm font-semibold tracking-[0.24em] text-primary uppercase'>
            Example 1
          </p>
          <h2>Generate the value in useEffect</h2>
          <p className='text-sm leading-6 text-foreground/70'>
            Use this when the random value only needs to exist after hydration.
            The server and the first client render stay deterministic.
          </p>
        </div>

        <RandomAfterMount />
      </section>

      <section className='space-y-4 rounded-2xl border border-foreground/10 bg-foreground/3 p-6'>
        <div className='space-y-2'>
          <p className='text-sm font-semibold tracking-[0.24em] text-primary uppercase'>
            Example 2
          </p>
          <h2>Wrap render-time randomness in Suspense</h2>
          <p className='text-sm leading-6 text-foreground/70'>
            Use this only for the advanced case where a client component must
            call <code>Math.random()</code> during render. Next.js prerenders
            the fallback and lets the random UI resolve on the client.
          </p>
        </div>

        <Suspense fallback={<RandomFallback />}>
          <RandomWithSuspense />
        </Suspense>
      </section>
    </div>
  )
}
