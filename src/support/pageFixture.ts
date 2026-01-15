// src/support/PageFixture.ts
import { Browser, BrowserContext, Page } from '@playwright/test';

export let pageFixture: {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

export function setPageFixture(fixture: typeof pageFixture) {
  pageFixture = fixture;
}