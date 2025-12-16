# Image List with Infinite Scroll

This example demonstrates an image list with infinite scroll using Next.js 16, React, Intersection Observer API, and Zustand for state management. Images load automatically as the user scrolls.

## Live Demo

- [https://nextjs-16-topaz.vercel.app/image-list-scroll](https://nextjs-16-topaz.vercel.app/image-list-scroll)

## Features

- Infinite scroll with sentinel-based loading via `Intersection Observer` API
- `Suspense` for skeleton placeholders during loading
- Responsive `CSS grid` layout
- `Zustand` store for state management
- Memoization with `React.memo` and `useMemo` to optimize re-renders
- Configurable batch size, starting index, and total images
- Lazy loading for images from the second batch onward
- `useTransition` for non-blocking UI updates
- Conditional sentinel rendering

> Note:
>
> - Uses [Lorem Picsum](https://picsum.photos/) image IDs. In production, we usually fetch data from an API.
> - For simplicity, no virtualization libraries were used, but they can be integrated for larger datasets.

## Usage

Navigate to `/image-list-scroll` in the Next.js app. Explore the code in `src/app/image-list-scroll/`.

## Components

- `ImageList`: Main component for the grid and scroll logic.
- `ImageItem`: Individual image renderer.
- `Sentinel`: Invisible trigger for loading more images.
- `ImageListSkeleton`: Skeleton placeholders with Suspense.

## Store and Hooks

- `useImageListStore`: Zustand store for state and loading.
- `useInfiniteScroll`: Hook for Intersection Observer logic.

## Configuration

See `src/app/image-list-scroll/config.ts` for `IMAGE_LIST_CONFIG` and `INTERSECTION_CONFIG`.

&nbsp;

---

&nbsp;

[**Go To Top &nbsp; ⬆️**](#image-list-with-infinite-scroll)
