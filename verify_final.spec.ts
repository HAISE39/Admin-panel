import { test, expect } from '@playwright/test';

test('verify final portfolio', async ({ page }) => {
  await page.goto('http://localhost:3001');

  // Wait for boot sequence
  await page.waitForSelector('h1:has-text("VELLIXAO")', { timeout: 15000 });

  // Take screenshot of Home
  await page.screenshot({ path: 'final_home.png' });

  // Go to WEBSITES
  await page.click('button:has-text("WEBSITES")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final_websites.png' });

  // Go to STORE
  await page.click('button:has-text("STORE")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final_store.png' });
});
