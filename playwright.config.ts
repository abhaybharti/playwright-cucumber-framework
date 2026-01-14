import { defineConfig } from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config();

const isCI = process.env.CI === 'true';
const headless = process.env.HEADLESS === 'true';
const browserName = process.env.BROWSER || 'chromium';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  workers: isCI ? Number(process.env.CI_WORKERS) || 1 : undefined,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    browserName: browserName as 'chromium' | 'firefox' | 'webkit',
    headless,
    screenshot: 'only-on-failure',
    video: process.env.VIDEO_CI === 'true' ? 'on' : 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'UI Tests',
      testMatch: '**/*.spec.ts',
    },
  ],
});
