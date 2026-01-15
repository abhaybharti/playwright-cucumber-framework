import { Locator, selectors } from '@playwright/test';
import { PageActions } from './PageActions';

export class LocatorFactory {
  private actions: PageActions;

  constructor(actions: PageActions) {
    this.actions = actions;
  }

  /**
   * Returns a Locator object based on the input provided.
   * @param {string | Locator} input - The input to create the Locator from.
   * @param {LocatorOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  public getLocator(input: string | Locator): Locator {
    return typeof input === 'string' ? this.actions.getPage().locator(input) : input;
  }

  /**
   * Returns a Locator object with a specific testId.
   * @param {string | RegExp} testId - The testId to create the Locator from.
   * @param {string} [attributeName] - Optional attribute name for the testId.
   * @returns {Locator} - The created Locator object.
   */
  public getLocatorByTestId(testId: string | RegExp, attributeName?: string): Locator {
    if (attributeName) {
      selectors.setTestIdAttribute(attributeName);
    }
    return this.actions.getPage().getByTestId(testId);
  }

  /**
   * Returns a Locator object with a specific text.
   * @param {string | RegExp} text - The text to create the Locator from.
   * @param {GetByTextOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  public getLocatorByText(text: string | RegExp): Locator {
    return this.actions.getPage().getByText(text);
  }

  /**
   * Returns a Locator object with a specific label.
   * @param {string | RegExp} text - The label text to create the Locator from.
   * @param {GetByRoleOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  public getLocatorByLabel(text: string | RegExp): Locator {
    return this.actions.getPage().getByLabel(text);
  }

  /**
   * Returns a Locator object with a specific placeholder.
   * @param {string | RegExp} text - The place holder text to create the Locator from.
   * @param {GetByPlaceholderOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  public getLocatorByPlaceholder(text: string | RegExp): Locator {
    return this.actions.getPage().getByPlaceholder(text);
  }

  /**
   * Returns a Locator object with a specific title.
   * @param {string | RegExp} text - The title text to create the Locator from.
   * @param {GetByTitleOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  public getLocatorByTitle(text: string | RegExp): Locator {
    return this.actions.getPage().getByTitle(text);
  }

  /**
   * Returns a Locator object with a specific alt text.
   * @param {string | RegExp} text - The alt text to create the Locator from.
   * @param {GetByAltTextOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  public getLocatorByAltText(text: string | RegExp): Locator {
    return this.actions.getPage().getByAltText(text);
  }

  /**
   * Returns all Locator objects based on the input provided.
   * @param {string | Locator} input - The input to create the Locators from.
   * @param {LocatorOptions} options - Optional parameters for the Locators.
   * @returns {Promise<Locator[]>} - The created Locator objects.
   */
  public async getAllLocators(input: string | Locator): Promise<Locator[]> {
    return typeof input === 'string'
      ? await this.actions.getPage().locator(input).all()
      : await input.all();
  }
}