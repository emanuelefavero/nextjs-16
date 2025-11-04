'use client'

import Image from 'next/image'
import { useState } from 'react'

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

  return (
    <div className='relative mx-auto mt-4 w-full'>
      <div className='relative mx-12 h-[460px]'>
        <Image
          src={images[currentIndex].src}
          alt={`Slider Image ${images[currentIndex].id}`}
          fill
          loading='eager'
          className='rounded-xl object-cover transition-all duration-500 ease-in-out'
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
      <div className='mt-4 flex justify-center'>
        {images.map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-1 w-10 ${
              index === currentIndex
                ? 'rounded-xl bg-fuchsia-500'
                : 'rounded-xl bg-neutral-500/50'
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
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
