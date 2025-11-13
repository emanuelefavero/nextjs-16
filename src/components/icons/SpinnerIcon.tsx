import { cn } from '@/lib/utils'

type Props = React.ComponentPropsWithRef<'div'> & {
  className?: string
}

export function SpinnerIcon({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'h-4 w-4 animate-spin rounded-full border-2 border-solid border-white/80 border-t-transparent',
        className,
      )}
      {...props}
    />
  )
}
