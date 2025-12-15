type Props = React.ComponentProps<'div'> & {
  isVisible: boolean
  isPending: boolean
}
import { LoadingIndicator } from '@/components/shared/loading-indicator'

export function Sentinel({ isVisible, isPending, ...props }: Props) {
  if (!isVisible) return null

  return (
    <div className='flex h-20 w-full items-center justify-center' {...props}>
      <LoadingIndicator isLoading={isPending} />
    </div>
  )
}
