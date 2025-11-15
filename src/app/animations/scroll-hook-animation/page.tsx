import { ScrollAnimatedElement } from './scroll-animated-element'

export default function Page() {
  return (
    <>
      <h1>Scroll Hook Animation</h1>

      <div className='h-[300vh] w-full bg-neutral-500/20 p-4'>
        <ScrollAnimatedElement />
      </div>
    </>
  )
}
