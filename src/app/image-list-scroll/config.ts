export const IMAGE_LIST_CONFIG = {
  INITIAL_ID: 10,
  MAX_ID: 90,
  BATCH_SIZE: 9,
} as const

export const INTERSECTION_CONFIG = {
  THRESHOLD: 0, // ? Trigger as soon as the sentinel enters the viewport
  ROOT_MARGIN: '100px', // ? Start loading before reaching the bottom
} as const
