import { IMAGE_LIST_CONFIG } from '@/app/image-list-scroll/config'
import Image from 'next/image'
import { memo } from 'react'

const { BATCH_SIZE } = IMAGE_LIST_CONFIG

type Props = {
  id: number
  index: number
}

export const ImageItem = memo(function ImageItem({ id, index }: Props) {
  return (
    <div className='relative aspect-video w-full animate-fade-in overflow-hidden rounded-lg bg-primary/20'>
      <Image
        src={`https://picsum.photos/id/${id}/800/600`}
        alt={`Image ${id}`}
        fill
        className='object-cover transition-transform duration-300 ease-in-out hover:scale-105'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority={index < BATCH_SIZE}
        loading={index < BATCH_SIZE ? 'eager' : 'lazy'}
      />
      <div className='absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-xs text-white'>
        ID: {id}
      </div>
    </div>
  )
})
