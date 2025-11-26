import { cn } from '@/lib/utils'

type StrokeClass = `stroke-${string}`

type Props = React.ComponentPropsWithRef<'svg'> & {
  strokeClass?: StrokeClass
  className?: string
}

export function MinusIcon({
  strokeClass = 'stroke-white',
  className,
  ...props
}: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // width='24'
      // height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('h-4 w-4 fill-transparent', strokeClass, className)}
      {...props}
    >
      <path d='M5 12h14' />
    </svg>
  )
}
