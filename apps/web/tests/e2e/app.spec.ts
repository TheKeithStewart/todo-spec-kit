import { test, expect } from '@playwright/test';

test('homepage displays welcome message', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'StackDay' })).toBeVisible();
  await expect(page.getByText('Productivity Platform')).toBeVisible();
  await expect(page.getByText('Development environment ready')).toBeVisible();
});
