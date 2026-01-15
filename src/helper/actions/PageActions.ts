import { Logger } from '../../helper/logger/Logger';
import { BrowserContext, Page, test } from '@playwright/test';
import { pageFixture } from '../../support/pageFixture';

export class PageActions {
    private page: Page;
    private context: BrowserContext;

    constructor() {
        this.page = pageFixture.page;
        this.context = pageFixture.context;
    }

    public getPage() {
        return this.page;
    }

    async gotoURL(url: string, description = 'target URL'): Promise<void> {
        Logger.step(`Navigate to ${description}: ${url}`);
        await this.page.goto(url, { waitUntil: 'load' });
    }

    async switchToDefaultPage(): Promise<void> {
        console.log('Switch to default (first) page');
        const pages = this.context.pages();
        if (pages.length > 0) {
            await pages[0].bringToFront();
            this.page = pages[0];
            console.log('Switched to default page');
        } else {
            throw new Error('No pages found in context');
        }
    }

    async switchToLastOpenedPage(): Promise<void> {
        console.log('Switch to last opened page');
        const pages = this.context.pages();
        if (pages.length > 1) {
            const lastPage = pages[pages.length - 1];
            await lastPage.bringToFront();
            this.page = lastPage;
            console.log('Switched to last opened page');
        } else {
            throw new Error('No additional pages to switch to');
        }
    }

    public async switchToFrameByIndex(index: number): Promise<void> {
        console.log(`Switch to frame at index ${index}`);
        const frame = this.page.frames()[index];
        if (!frame) throw new Error(`Frame at index ${index} not found`);
        this.page = frame.page();
    }

    public async closeCurrentTab(): Promise<void> {
        console.log('Close current tab');
        await this.page.close();
        console.log('Closed current tab');
    }

    public async resizeWindow(width: number, height: number): Promise<void> {
        console.log(`Resize window to ${width}x${height}`);
        await this.page.setViewportSize({ width, height });
    }

    public async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void> {
        console.log(`Wait for page load state: ${state}`);
        await pageFixture.page.waitForLoadState(state);
    }
}