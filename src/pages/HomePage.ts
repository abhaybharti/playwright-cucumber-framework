import { HomeLocators } from '../support/locators/HomeLocators';
import { ConfigManager } from '../config/ConfigManager';
import { UIActions } from '../helper/actions/UIActions';
import { ExpectUtils } from '../helper/asserts/ExpectUtils';

export class HomePage {
  private uiActions: UIActions;
  private expectUtils: ExpectUtils;

  constructor() {
    this.uiActions = new UIActions();
    this.expectUtils = new ExpectUtils(this.uiActions.getPageActions());
  }
  async navigateToHome(): Promise<void> {
    console.log(`${ConfigManager.getBaseUIUrl()}/index.htm`);
    await this.uiActions.getPageActions().gotoURL(`${ConfigManager.getBaseUIUrl()}/index.htm`);
    await this.uiActions.getPageActions().waitForLoadState('load');
  }

  async isLogoVisible(): Promise<void> {
    const logoLocator = this.uiActions.element(HomeLocators.PARABANK_LOGO, 'ParaBank Logo');
    await logoLocator.waitFor({ state: 'visible', timeout: 10000 });
    await this.expectUtils.expectElementToBeVisible(logoLocator, 'Logo is not visible');
  }

  async verifyLoginFields(fields: string[]): Promise<void> {
    for (const field of fields) {
      const selector =
        field.toLowerCase() === 'username'
          ? HomeLocators.USERNAME_FIELD
          : HomeLocators.PASSWORD_FIELD;
      const userNameLocator = this.uiActions.element(selector, 'HomePageLocators.USERNAME_FIELD');
      await this.expectUtils.expectElementToBeVisible(
        userNameLocator,
        'HomePageLocators.USERNAME_FIELD is not visible'
      );
    }
  }
}