import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../support/hooks';
import { ConfigManager } from '../../config/ConfigManager';

Given('the user navigates to the index page', async () => {
  await pageFixture.page.goto(`${ConfigManager.getBaseUIUrl()}/index.htm`);
  await pageFixture.page.waitForLoadState('load');
});

Then('the user should see the ParaBank logo', async () => {
  await expect(pageFixture.page.locator('img.logo')).toBeVisible({ timeout: 10000 });
});

Then('the user should see the login form with fields:', async (dataTable) => {
  const fields = dataTable.raw().flat();
  for (const field of fields) {
    const selector = field.toLowerCase() === 'username' ? '[name="username"]' : '[name="password"]';
    await expect(pageFixture.page.locator(selector)).toBeVisible();
  }
});