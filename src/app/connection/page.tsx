import { Suspense } from 'react'
import { Component } from './component'

export default function Page() {
  return (
    <>
      <h1>Connection</h1>

      <Suspense fallback={<p>Establishing connection...</p>}>
        <Component />
      </Suspense>
    </>
  )
}
