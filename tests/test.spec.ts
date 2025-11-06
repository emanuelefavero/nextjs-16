import { expect, test } from '@playwright/test'

test('should navigate to the test page', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Find link with text "Test Page" and click it
  const testPageLink = page.getByRole('link', { name: 'Test Page' })
  await testPageLink.click()

  await expect(page).toHaveURL('http://localhost:3000/test')
  await expect(page.getByRole('heading', { name: 'Test Page' })).toBeVisible()
})
