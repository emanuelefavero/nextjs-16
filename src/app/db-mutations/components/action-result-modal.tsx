'use client'

import { useActionResultStore } from '@/app/db-mutations/store/actionResultStore'
import { useEffect } from 'react'

export function ActionResultModal() {
  const { result, show, reset } = useActionResultStore()

  useEffect(() => {
    if (show && result) {
      const timer = setTimeout(() => {
        reset()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, result, reset])

  if (!show || !result) return null

  return (
    <div className='fixed right-4 bottom-4 z-50 scale-75 animate-slide-in-from-right sm:scale-100'>
      <div className='flex items-center justify-between gap-4 rounded-lg border border-foreground/20 bg-background p-4 shadow-lg'>
        {'error' in result && (
          <p>
            <span className='text-error-foreground'>Error:&nbsp;</span>
            {result.error}
          </p>
        )}
        {'data' in result && (
          <p>
            <span className='hidden text-success-foreground sm:inline-block'>
              Successfully deleted:&nbsp;
            </span>
            <span className='inline-block text-success-foreground sm:hidden'>
              Deleted:&nbsp;
            </span>
            {result.data.name}
          </p>
        )}
        <button
          onClick={reset}
          className='border border-success-foreground/20 bg-success px-4 py-[.4rem] disabled:opacity-75'
        >
          Close
        </button>
      </div>
    </div>
  )
}
