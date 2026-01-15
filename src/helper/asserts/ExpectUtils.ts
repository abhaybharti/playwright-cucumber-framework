import { expect, Locator, Expect } from '@playwright/test';
import { LocatorFactory } from '../actions/LocatorFactory';
import { PageActions } from '../actions/PageActions'; // Only if you need page title assertions

// Optional type to support soft assertions
export interface SoftOption {
    soft?: boolean;
}

// Optional type to extend future expectation options
export interface ExpectOptions extends SoftOption {
    timeout?: number;
}

export class ExpectUtils {
    private readonly actions: PageActions;
    private readonly locatorFactory: LocatorFactory;

    constructor(actions: PageActions) {
        this.actions = actions;
        this.locatorFactory = new LocatorFactory(this.actions);
    }
    /**
     * Returns a configured `expect` instance with soft option.
     */
    private getExpectWithSoftOption(options?: SoftOption): Expect {
        return expect.configure({ soft: options?.soft });
    }

    /**
     * Resolves a locator and returns it with the configured expect.
     */
    private getLocatorAndAssert(
        input: string | Locator,
        options?: SoftOption
    ): { locator: Locator; assert: Expect } {
        const locator = LocatorFactory.getLocator(input);
        const assert = this.getExpectWithSoftOption(options);
        return { locator, assert };
    }

    /**
     * Verifies an element is hidden.
     */
    public async expectElementToBeHidden(
        input: string | Locator,
        errorMessage: string,
        options?: ExpectOptions
    ): Promise<void> {
        const { locator, assert } = this.getLocatorAndAssert(input, options);
        try {
            await assert(locator).toBeHidden(options);
        } catch (error) {
            console.log('expectElementToBeHidden error:', error);
            throw new Error(errorMessage);
        }
    }

    /**
     * Verifies an element is visible.
     */
    public async expectElementToBeVisible(
        input: string | Locator,
        errorMessage: string,
        options?: ExpectOptions
    ): Promise<void> {
        const { locator, assert } = this.getLocatorAndAssert(input, options);
        try {
            await assert(locator).toBeVisible(options);
        } catch (error) {
            console.log('expectElementToBeVisible error:', error);
            throw new Error(errorMessage);
        }
    }

    /**
     * Verifies page title.
     */
    public async expectPageToHaveTitle(titleOrRegExp: string | RegExp, errorMessage: string, options?: ExpectOptions): Promise<void> {
        const assert = this.getExpectWithSoftOption(options);
        try {
            await assert(this.actions.getPage() as any).toHaveTitle(titleOrRegExp, options);
        } catch (error) {
            console.log("An error occurred:" + error);
            throw new Error(`${errorMessage}`);
        }
    }

    // Add more expectation methods as needed...
}