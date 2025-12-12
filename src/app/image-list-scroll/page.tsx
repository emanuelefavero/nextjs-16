import { Suspense } from 'react'
import { ImageList } from './image-list'
import { ImageListSkeleton } from './image-list-skeleton'

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
