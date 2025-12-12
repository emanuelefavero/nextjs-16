import { Suspense } from 'react'
import { ImageList } from './components/image-list'
import { ImageListSkeleton } from './components/image-list-skeleton'

export default function Page() {
  return (
    <>
      <h1>Image List Scroll</h1>

      <Suspense fallback={<ImageListSkeleton />}>
        <ImageList />
      </Suspense>
    </>
  )
}
