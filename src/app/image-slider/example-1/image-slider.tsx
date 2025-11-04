'use client'

import Image from 'next/image'
import { Suspense, useState } from 'react'

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

  const prev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    )
  }

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Calculate adjacent indices for preloading
  const prevIndex = (currentIndex - 1 + images.length) % images.length
  const nextIndex = (currentIndex + 1) % images.length

  return (
    <div className='relative mx-auto mt-4 w-full'>
      <div className='relative mx-12 h-[460px]'>
        {/* Current Image */}
        <CurrentImage
          src={images[currentIndex].src}
          alt={`Image ${images[currentIndex].id}`}
        />

        {/* Preload adjacent images */}
        <ImagePreloader
          src={images[prevIndex].src}
          alt={`Preload Image ${images[prevIndex].id}`}
        />
        <ImagePreloader
          src={images[nextIndex].src}
          alt={`Preload Image ${images[nextIndex].id}`}
        />
      </div>

      {/* Navigation buttons */}
      <Button className='left-0' onClick={prev}>
        ‹
      </Button>
      <Button className='right-0' onClick={next}>
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

type ImagePreloaderProps = {
  src: string
  alt: string
}

function ImageFallback() {
  return (
    <div className='flex h-full w-full items-center justify-center rounded-xl bg-neutral-100'>
      <div className='h-8 w-8 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent' />
    </div>
  )
}

type CurrentImageProps = {
  src: string
  alt: string
}

function CurrentImage({ src, alt }: CurrentImageProps) {
  return (
    <Suspense fallback={<ImageFallback />}>
      <Image
        src={src}
        alt={alt}
        fill
        loading='eager'
        className='rounded-xl object-cover transition-all duration-500 ease-in-out'
      />
    </Suspense>
  )
}

function ImagePreloader({ src, alt }: ImagePreloaderProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
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
