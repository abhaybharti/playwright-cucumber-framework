import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { ConfigManager } from '../config/ConfigManager';
import { setPageFixture, pageFixture } from './pageFixture';
import { setDefaultTimeout } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

setDefaultTimeout(60 * 1000); // 60 seconds

// export let pageFixture: {
//   browser: Browser;
//   context: BrowserContext;
//   page: Page;
// };

Before(async () => {
  const browserName = ConfigManager.getBrowser();
  const browserType = { chromium, firefox, webkit }[browserName];
  const browser = await browserType.launch({ headless: ConfigManager.isHeadless() });

  const context = await browser.newContext({
    recordVideo: {
      dir: 'reports/videos/',
      size: { width: 1280, height: 720 },
    },
  });
  const page = await context.newPage();

  setPageFixture({ browser, context, page });
});

After(async function (scenario) {
  const timestamp = Date.now();
  const scenarioName = scenario.pickle.name.replace(/[^a-z0-9\-]/gi, '_');
  const uri = scenario.gherkinDocument.uri || 'unknown_feature';
  const featureName = path.basename(uri, path.extname(uri)).replace(/[^a-z0-9\-]/gi, '_');

  if (scenario.result?.status === Status.FAILED) {
    const screenshotDir = path.join('reports', 'screenshots', featureName);
    const fileName = `${scenarioName}_${timestamp}.png`;
    const filePath = path.join(screenshotDir, fileName);

    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    await pageFixture.page.screenshot({ path: filePath, fullPage: true });

    const buffer = fs.readFileSync(filePath);
    this.attach(buffer, 'image/png');

    const videoPath = await pageFixture.page.video()?.path();
    if (videoPath) {
      const videoBuffer = fs.readFileSync(videoPath);
      this.attach(videoBuffer, 'video/webm');
      console.log(`Video recorded: ${videoPath}`);
    }
  }

  await pageFixture.page.close();
  await pageFixture.context.close();
  await pageFixture.browser.close();
});