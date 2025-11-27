import { cn } from '@/lib/utils'

type Props = React.ComponentPropsWithRef<'button'> & {}

export function ProductQuantityButton({
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        'border border-danger-foreground/20 bg-danger px-4 py-[.4rem] disabled:opacity-75',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
