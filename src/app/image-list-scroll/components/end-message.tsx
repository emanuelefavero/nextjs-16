import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'div'> & {
  isVisible: boolean
  message: string
}

export function EndMessage({ isVisible, message, className, ...props }: Props) {
  if (!isVisible) return null

  return (
    <div
      className={cn('py-4 text-center text-foreground', className)}
      {...props}
    >
      {message}
    </div>
  )
}
