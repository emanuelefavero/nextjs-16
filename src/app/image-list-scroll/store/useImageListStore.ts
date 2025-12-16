import { IMAGE_LIST_CONFIG } from '@/app/image-list-scroll/config'
import { ImageId } from '@/app/image-list-scroll/types'
import { create } from 'zustand'

const { INITIAL_ID, MAX_ID, BATCH_SIZE } = IMAGE_LIST_CONFIG

// Initialize with the first batch of image IDs
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

/**
 * Zustand store for managing the image list state and infinite scroll logic.
 * Handles loading more images in batches and tracking completion status.
 */
export const useImageListStore = create<ImageListState>((set) => ({
  ids: initialIds,
  isFullyLoaded: false,

  loadMore: () => {
    set(({ ids }) => {
      const lastId = ids[ids.length - 1]

      // Stop loading if we've reached the maximum ID
      if (lastId >= MAX_ID) {
        return { ids }
      }

      // Generate next batch of IDs, ensuring we don't exceed MAX_ID
      const nextIds = Array.from(
        { length: BATCH_SIZE },
        (_, i) => lastId + 1 + i,
      ).filter((id) => id <= MAX_ID)

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
