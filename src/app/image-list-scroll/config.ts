// Configuration constants for the image list scroll functionality

// Image ID range and batch loading configuration
export const IMAGE_LIST_CONFIG = {
  INITIAL_ID: 10, // Starting image ID for the initial batch
  MAX_ID: 90, // Maximum image ID to prevent infinite loading
  BATCH_SIZE: 9, // Number of images to load per batch
} as const

// Intersection observer configuration for scroll detection
export const INTERSECTION_CONFIG = {
  THRESHOLD: 0, // Trigger as soon as the sentinel enters the viewport
  ROOT_MARGIN: '100px', // Start loading 100px before reaching the bottom
} as const
