import { expect, test } from '@playwright/test'

// Performance threshold in milliseconds
const PERFORMANCE_THRESHOLD = 5000 // 5 seconds max for data fetch

interface PerformanceMetrics {
  navigationTime: number
  buttonClickToFirstUser: number
  totalLoadTime: number
  userCount?: number
}

/**
 * Measures performance of fetching users with actions and useTransition
 * Only runs on Chrome (chromium)
 */
test('performance: fetching with actions and useTransition', async ({
  page,
}) => {
  const metrics: PerformanceMetrics = {
    navigationTime: 0,
    buttonClickToFirstUser: 0,
    totalLoadTime: 0,
  }

  // Navigate to the page and measure navigation time
  const startNavigation = Date.now()
  await page.goto(
    'http://localhost:3000/fetching/button-triggered/actions-use-transition',
    {
      waitUntil: 'networkidle',
    },
  )
  metrics.navigationTime = Date.now() - startNavigation

  // Verify the page is loaded
  await expect(
    page.getByRole('heading', {
      name: 'Fetching with Actions and useTransition',
    }),
  ).toBeVisible()

  // Get the button and wait for it to be clickable
  const button = page.getByRole('button', { name: 'Fetch Users' })
  await expect(button).toBeEnabled()

  // Measure time from button click to first user appearing
  const startClick = Date.now()
  await button.click()

  // Wait for the loading state to appear
  await expect(page.getByRole('button', { name: 'Loading...' })).toBeVisible({
    timeout: 1000,
  })

  // Wait for the first list item to appear (users data)
  const firstUserItem = page.getByRole('listitem').first()
  await expect(firstUserItem).toBeVisible({
    timeout: PERFORMANCE_THRESHOLD,
  })
  metrics.buttonClickToFirstUser = Date.now() - startClick

  // Get all users and verify they loaded
  const userItems = page.getByRole('listitem')
  const userCount = await userItems.count()
  metrics.userCount = userCount
  expect(userCount).toBeGreaterThan(0)

  // Collect browser metrics
  const navigationMetrics = await page.evaluate(() => {
    const navigationTiming = performance.getEntriesByType(
      'navigation',
    )[0] as PerformanceNavigationTiming
    return {
      domContentLoaded:
        navigationTiming.domContentLoadedEventEnd -
        navigationTiming.domContentLoadedEventStart,
      loadEventDuration:
        navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
      domInteractive:
        navigationTiming.domInteractive - navigationTiming.fetchStart,
    }
  })

  // Calculate total time including navigation
  metrics.totalLoadTime =
    metrics.navigationTime + metrics.buttonClickToFirstUser

  // Print performance report
  console.log('\n=== Performance Test: Actions + useTransition ===')
  console.log(`Navigation Time: ${metrics.navigationTime}ms`)
  console.log(`Button Click to First User: ${metrics.buttonClickToFirstUser}ms`)
  console.log(`Total Time: ${metrics.totalLoadTime}ms`)
  console.log(`Users Fetched: ${userCount}`)
  console.log(`DOM Content Loaded: ${navigationMetrics.domContentLoaded}ms`)
  console.log(`Load Event Duration: ${navigationMetrics.loadEventDuration}ms`)
  console.log(`DOM Interactive: ${navigationMetrics.domInteractive}ms`)

  // Assert performance is within acceptable threshold
  expect(metrics.buttonClickToFirstUser).toBeLessThan(PERFORMANCE_THRESHOLD)
})

/**
 * Measures performance of fetching users with client-only components
 * Only runs on Chrome (chromium)
 */
test('performance: fetching with client-only components', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Performance tests only run on Chrome')

  const metrics: PerformanceMetrics = {
    navigationTime: 0,
    buttonClickToFirstUser: 0,
    totalLoadTime: 0,
  }

  // Navigate to the page and measure navigation time
  const startNavigation = Date.now()
  await page.goto(
    'http://localhost:3000/fetching/button-triggered/client-only',
    {
      waitUntil: 'networkidle',
    },
  )
  metrics.navigationTime = Date.now() - startNavigation

  // Verify the page is loaded
  await expect(
    page.getByRole('heading', {
      name: 'Fetching with Client Components Only',
    }),
  ).toBeVisible()

  // Get the button and wait for it to be clickable
  const button = page.getByRole('button', { name: 'Fetch Users' })
  await expect(button).toBeEnabled()

  // Measure time from button click to first user appearing
  const startClick = Date.now()
  await button.click()

  // Wait for the loading state to appear
  await expect(page.getByRole('button', { name: 'Loading...' })).toBeVisible({
    timeout: 1000,
  })

  // Wait for the first list item to appear (users data)
  const firstUserItem = page.getByRole('listitem').first()
  await expect(firstUserItem).toBeVisible({
    timeout: PERFORMANCE_THRESHOLD,
  })
  metrics.buttonClickToFirstUser = Date.now() - startClick

  // Get all users and verify they loaded
  const userItems = page.getByRole('listitem')
  const userCount = await userItems.count()
  metrics.userCount = userCount
  expect(userCount).toBeGreaterThan(0)

  // Collect browser metrics
  const navigationMetrics = await page.evaluate(() => {
    const navigationTiming = performance.getEntriesByType(
      'navigation',
    )[0] as PerformanceNavigationTiming
    return {
      domContentLoaded:
        navigationTiming.domContentLoadedEventEnd -
        navigationTiming.domContentLoadedEventStart,
      loadEventDuration:
        navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
      domInteractive:
        navigationTiming.domInteractive - navigationTiming.fetchStart,
    }
  })

  // Calculate total time including navigation
  metrics.totalLoadTime =
    metrics.navigationTime + metrics.buttonClickToFirstUser

  // Print performance report
  console.log('\n=== Performance Test: Client-Only Components ===')
  console.log(`Navigation Time: ${metrics.navigationTime}ms`)
  console.log(`Button Click to First User: ${metrics.buttonClickToFirstUser}ms`)
  console.log(`Total Time: ${metrics.totalLoadTime}ms`)
  console.log(`Users Fetched: ${userCount}`)
  console.log(`DOM Content Loaded: ${navigationMetrics.domContentLoaded}ms`)
  console.log(`Load Event Duration: ${navigationMetrics.loadEventDuration}ms`)
  console.log(`DOM Interactive: ${navigationMetrics.domInteractive}ms`)

  // Assert performance is within acceptable threshold
  expect(metrics.buttonClickToFirstUser).toBeLessThan(PERFORMANCE_THRESHOLD)
})

/**
 * Comparison test: runs both approaches and compares results
 * Only runs on Chrome (chromium)
 */
test('performance: comparison between both approaches', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Performance tests only run on Chrome')

  const results: Record<string, PerformanceMetrics> = {
    'actions-use-transition': {
      navigationTime: 0,
      buttonClickToFirstUser: 0,
      totalLoadTime: 0,
    },
    'client-only': {
      navigationTime: 0,
      buttonClickToFirstUser: 0,
      totalLoadTime: 0,
    },
  }

  // Test 1: Actions + useTransition
  {
    const startNavigation = Date.now()
    await page.goto(
      'http://localhost:3000/fetching/button-triggered/actions-use-transition',
      { waitUntil: 'networkidle' },
    )
    results['actions-use-transition'].navigationTime =
      Date.now() - startNavigation

    const button = page.getByRole('button', { name: 'Fetch Users' })
    await expect(button).toBeEnabled()

    const startClick = Date.now()
    await button.click()

    await expect(page.getByRole('button', { name: 'Loading...' })).toBeVisible({
      timeout: 1000,
    })

    const firstUserItem = page.getByRole('listitem').first()
    await expect(firstUserItem).toBeVisible({
      timeout: PERFORMANCE_THRESHOLD,
    })
    results['actions-use-transition'].buttonClickToFirstUser =
      Date.now() - startClick

    results['actions-use-transition'].totalLoadTime =
      results['actions-use-transition'].navigationTime +
      results['actions-use-transition'].buttonClickToFirstUser
  }

  // Test 2: Client-Only Components
  {
    const startNavigation = Date.now()
    await page.goto(
      'http://localhost:3000/fetching/button-triggered/client-only',
      { waitUntil: 'networkidle' },
    )
    results['client-only'].navigationTime = Date.now() - startNavigation

    const button = page.getByRole('button', { name: 'Fetch Users' })
    await expect(button).toBeEnabled()

    const startClick = Date.now()
    await button.click()

    await expect(page.getByRole('button', { name: 'Loading...' })).toBeVisible({
      timeout: 1000,
    })

    const firstUserItem = page.getByRole('listitem').first()
    await expect(firstUserItem).toBeVisible({
      timeout: PERFORMANCE_THRESHOLD,
    })
    results['client-only'].buttonClickToFirstUser = Date.now() - startClick

    results['client-only'].totalLoadTime =
      results['client-only'].navigationTime +
      results['client-only'].buttonClickToFirstUser
  }

  // Print comparison report
  console.log('\n========== Performance Comparison Report ==========')
  const timeDiff =
    results['client-only'].totalLoadTime -
    results['actions-use-transition'].totalLoadTime
  const winner =
    results['actions-use-transition'].totalLoadTime <
    results['client-only'].totalLoadTime
      ? 'Actions + useTransition'
      : 'Client-Only Components'
  const percentage = (
    (Math.abs(timeDiff) /
      Math.max(
        results['actions-use-transition'].totalLoadTime,
        results['client-only'].totalLoadTime,
      )) *
    100
  ).toFixed(1)

  console.log(`
Approach: Actions + useTransition
  - Navigation Time: ${results['actions-use-transition'].navigationTime}ms
  - Button Click to First User: ${results['actions-use-transition'].buttonClickToFirstUser}ms
  - Total Time: ${results['actions-use-transition'].totalLoadTime}ms

Approach: Client-Only Components
  - Navigation Time: ${results['client-only'].navigationTime}ms
  - Button Click to First User: ${results['client-only'].buttonClickToFirstUser}ms
  - Total Time: ${results['client-only'].totalLoadTime}ms

Difference (Client-Only vs Actions + useTransition):
  - Navigation Time: ${results['client-only'].navigationTime - results['actions-use-transition'].navigationTime}ms
  - Button Click Time: ${results['client-only'].buttonClickToFirstUser - results['actions-use-transition'].buttonClickToFirstUser}ms
  - Total Time: ${timeDiff}ms (${percentage}%)
  
🏆 Winner: ${winner}
`)

  // Both should complete within threshold
  expect(results['actions-use-transition'].buttonClickToFirstUser).toBeLessThan(
    PERFORMANCE_THRESHOLD,
  )
  expect(results['client-only'].buttonClickToFirstUser).toBeLessThan(
    PERFORMANCE_THRESHOLD,
  )
})
