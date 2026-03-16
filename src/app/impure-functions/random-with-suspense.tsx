import { cacheLife, cacheTag } from 'next/cache'

export async function RandomWithSuspense() {
  'use cache'
  cacheTag('random-with-suspense')
  cacheLife({ expire: 0 })

  // eslint-disable-next-line react-hooks/purity -- This example intentionally demonstrates render-time randomness isolated behind Suspense.
  const randomNumber = Math.floor(Math.random() * 100) + 1

  return (
    <p className='font-mono text-2xl text-primary'>
      Random number: {randomNumber}
    </p>
  )
}
