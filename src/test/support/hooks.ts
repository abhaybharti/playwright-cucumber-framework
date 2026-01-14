import { Before, After } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { ConfigManager } from '../../../src/config/ConfigManager';

export let pageFixture: {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

Before(async () => {
  const browserName = ConfigManager.getBrowser(); // 'chromium' | 'firefox' | 'webkit' | 'msedge'
  const headless = ConfigManager.isHeadless();
  let browser: Browser;
  switch (browserName) {
    case 'msedge':
      browser = await chromium.launch({ channel: 'msedge', headless });
      break;
    case 'firefox':
      browser = await firefox.launch({ headless });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless });
      break;
    case 'chromium':
    default:
      browser = await chromium.launch({ headless });
      break;
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  pageFixture = { browser, context, page };
});

After(async () => {
  await pageFixture.page.close();
  await pageFixture.context.close();
  await pageFixture.browser.close();
});