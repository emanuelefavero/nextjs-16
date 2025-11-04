'use client'

import Image from 'next/image'
import { useState, useTransition } from 'react'

type ImageData = {
  src: string
  id: number
}

// Image data array - 10 images from Lorem Picsum (IDs 33-42)
const images: ImageData[] = Array.from({ length: 10 }, (_, i) => ({
  src: `https://picsum.photos/id/${33 + i}/800/600.webp`,
  id: 33 + i,
}))

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isPending, startTransition] = useTransition()

  const prev = () => {
    startTransition(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length,
      )
    })
  }

  const next = () => {
    startTransition(async () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    })
  }

  // Calculate adjacent indices for preloading
  const prevIndex = (currentIndex - 1 + images.length) % images.length
  const nextIndex = (currentIndex + 1) % images.length

  return (
    <div className='relative mx-auto mt-4 w-full'>
      <div className='relative mx-12 h-[460px]'>
        {/* Show skeleton while pending */}
        {isPending ? (
          <ImageSkeleton />
        ) : (
          <CurrentImage
            src={images[currentIndex].src}
            alt={`Image ${images[currentIndex].id}`}
          />
        )}
      </div>

      {/* Preload adjacent images */}
      <ImagePreloader src={images[prevIndex].src} />
      <ImagePreloader src={images[nextIndex].src} />

      {/* Navigation buttons */}
      <Button className='left-0' onClick={prev} disabled={isPending}>
        ‹
      </Button>
      <Button className='right-0' onClick={next} disabled={isPending}>
        ›
      </Button>

      {/* Navigation Info */}
      <div className='mt-4 flex justify-center gap-2'>
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 rounded-xl ${
              index === currentIndex ? 'bg-fuchsia-500' : 'bg-neutral-500/50'
            } transition-colors duration-500 ease-in-out`}
          />
        ))}
      </div>
    </div>
  )
}

function ImageSkeleton() {
  return (
    <div className='flex h-full w-full items-center justify-center rounded-xl bg-neutral-100'>
      <div className='flex flex-col items-center gap-2'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent' />
        <span className='text-sm text-neutral-500'>Loading image...</span>
      </div>
    </div>
  )
}

type CurrentImageProps = {
  src: string
  alt: string
}

function CurrentImage({ src, alt }: CurrentImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      priority
      fill
      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 85vw'
      loading='eager'
      className='rounded-xl object-cover transition-all duration-500 ease-in-out'
      onError={() => {
        console.error(`Image failed to load: ${src}`)
      }}
    />
  )
}

type ImagePreloaderProps = {
  src: string
}

function ImagePreloader({ src }: ImagePreloaderProps) {
  return (
    <Image
      src={src}
      alt='preload'
      fill
      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 85vw'
      loading='eager'
      className='hidden rounded-xl object-cover'
    />
  )
}

type ButtonProps = React.ComponentPropsWithRef<'button'>

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`absolute top-1/2 -mt-2.5 h-[459px] -translate-y-1/2 transform rounded-xl p-2 text-2xl font-bold text-white ${props.className}`}
    >
      {children}
    </button>
  )
}
