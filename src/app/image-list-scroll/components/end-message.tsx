import { useImageListStore } from '@/app/image-list-scroll/store/useImageListStore'
import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'div'> & {
  message: string
}

export function EndMessage({ message, className, ...props }: Props) {
  const { getLoadCompleted } = useImageListStore()
  const loadCompleted = getLoadCompleted()

  if (!loadCompleted) return null

  return (
    <div
      className={cn('py-4 text-center text-foreground', className)}
      {...props}
    >
      {message}
    </div>
  )
}
