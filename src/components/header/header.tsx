import { BackButton } from '@/components/shared/back-button'
import { Logo } from './logo'

export function Header() {
  return (
    <header className='flex items-center gap-2 border-b border-neutral-500/30 px-4 py-2'>
      <Logo />
      <BackButton>Back</BackButton>
    </header>
  )
}
