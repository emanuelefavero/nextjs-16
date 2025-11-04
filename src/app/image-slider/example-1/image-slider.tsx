'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

// Interface for image data
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
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    )
  }

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide()
      }, 3000)

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval)
      }
    }
  }, [isHovered])

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true)
  }

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false)
  }

  return (
    <div className='relative mx-auto mt-4 w-full'>
      <div
        className='group relative mx-12 h-[460px] hover:-translate-y-2'
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[currentIndex].src}
          alt={`Slider Image ${images[currentIndex].id}`}
          fill
          className='cursor-pointer rounded-xl object-cover transition-all duration-500 ease-in-out'
        />
      </div>
      <button
        className='group absolute top-1/2 left-0 mx-1 -mt-2.5 h-[459px] -translate-y-1/2 transform rounded-xl bg-[#111927] p-2 text-white hover:bg-[#1a222f]'
        onClick={prevSlide}
      >
        <span className='text-2xl font-bold text-gray-400 group-hover:text-white'>
          ‹
        </span>
      </button>
      <button
        className='group absolute top-1/2 right-0 mx-1 -mt-2.5 h-[459px] -translate-y-1/2 transform rounded-xl bg-[#111927] p-2 text-white hover:bg-[#1a222f]'
        onClick={nextSlide}
      >
        <span className='text-2xl font-bold text-gray-400 group-hover:text-white'>
          ›
        </span>
      </button>
      <div className='mt-4 flex justify-center'>
        {images.map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-1 w-10 ${
              index === currentIndex
                ? 'rounded-xl bg-[#beff46]'
                : 'rounded-xl bg-gray-300'
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  )
}
