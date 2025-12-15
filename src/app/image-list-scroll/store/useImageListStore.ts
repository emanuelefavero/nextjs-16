import { IMAGE_LIST_CONFIG } from '@/app/image-list-scroll/config'
import { ImageId } from '@/app/image-list-scroll/types'
import { create } from 'zustand'

const { INITIAL_ID, MAX_ID, BATCH_SIZE } = IMAGE_LIST_CONFIG

const initialIds: ImageId[] = Array.from(
  { length: BATCH_SIZE },
  (_, i) => INITIAL_ID + i,
)

export type ImageListState = {
  // State
  ids: ImageId[]
  isFullyLoaded: boolean

  // Actions
  loadMore: () => void
  reset: () => void
}

export const useImageListStore = create<ImageListState>((set) => ({
  ids: initialIds,
  isFullyLoaded: false,

  loadMore: () => {
    set(({ ids }) => {
      const lastId = ids[ids.length - 1]

      // Stop if we've reached the limit
      if (lastId >= MAX_ID) {
        return { ids }
      }

      // Calculate next batch
      const nextIds = Array.from(
        { length: BATCH_SIZE },
        (_, i) => lastId + 1 + i,
      ).filter((id) => id <= MAX_ID) // ? Ensure we don't exceed MAX_ID

      const newIds = [...ids, ...nextIds]
      const newLastId = newIds[newIds.length - 1]

      return {
        ids: newIds,
        isFullyLoaded: newLastId >= MAX_ID,
      }
    })
  },

  reset: () => {
    set({ ids: initialIds, isFullyLoaded: false })
  },
}))
