'use client'

import { useActionResultStore } from './store/actionResultStore'

export function ActionResultModal() {
  const { result, show, reset } = useActionResultStore()

  if (!show || !result) return null

  return (
    <div className='fixed right-4 bottom-4 z-50 scale-75 animate-slide-in-from-right sm:scale-100'>
      <div className='flex items-center justify-between gap-4 rounded-lg border border-foreground/20 bg-background p-4 shadow-lg'>
        {'error' in result && (
          <p className='text-danger-foreground'>Error: {result.error}</p>
        )}
        {'data' in result && (
          <p className='text-success-foreground'>Deleted: {result.data.name}</p>
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
