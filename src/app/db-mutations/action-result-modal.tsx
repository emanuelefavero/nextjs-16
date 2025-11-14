'use client'

import { useActionResultStore } from './store/actionResultStore'

export function ActionResultModal() {
  const { result, show, reset } = useActionResultStore()

  if (!show || !result) return null

  return (
    <dialog
      open
      className='rounded border border-foreground/30 bg-background p-4 shadow-lg'
    >
      {'error' in result && (
        <p className='text-danger-foreground'>Error: {result.error}</p>
      )}
      {'data' in result && (
        <p className='text-success-foreground'>Deleted: {result.data.name}</p>
      )}
      <button
        onClick={reset}
        className='mt-2 border border-success-foreground/20 bg-success px-4 py-[.4rem] disabled:opacity-75'
      >
        Close
      </button>
    </dialog>
  )
}
