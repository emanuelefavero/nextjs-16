import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1>Image Slider</h1>

      <ul className='flex flex-col gap-2'>
        <li>
          <Link href='/image-slider/example-1'>Example 1</Link>
        </li>
      </ul>
    </>
  )
}
