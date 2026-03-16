import { Suspense } from 'react'

import { RandomAfterMount } from './random-after-mount'
import { RandomWithSuspense } from './random-with-suspense'

export default function Page() {
  return (
    <div className='max-w-3xl'>
      <h1>Impure Functions</h1>

      <p>
        Impure functions like <code>Math.random()</code> should not run during
        prerendered client renders unless you intentionally isolate them. These
        examples show the two safe patterns to avoid hydration errors in Next.js
        16.
      </p>

      {/* Example 1 */}
      <section>
        <h2>Example 1 - Generate the value in useEffect</h2>
        <p>
          Use this when the random value only needs to exist after hydration.
          The server and the first client render stay deterministic.
        </p>

        <RandomAfterMount />
      </section>

      {/* Example 2 */}
      <section>
        <h2>Example 2 - Wrap render-time randomness in Suspense</h2>
        <p>
          Use this only for the advanced case where a client component must call{' '}
          <code>Math.random()</code> during render. Next.js prerenders the
          fallback and lets the random UI resolve on the client.
        </p>

        <Suspense fallback={<>Loading...</>}>
          <RandomWithSuspense />
        </Suspense>
      </section>
    </div>
  )
}
