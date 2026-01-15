import { ConfigManager } from '../config/ConfigManager';
import { UIActions } from '../helper/actions/UIActions';
import { AssertUtils } from '../helper/asserts/AssertUtils';
import { RegistrationPageLocators } from '../support/locators/RegistrationPageLocators';

export class RegistrationPage {
    private uiActions: UIActions;
    private assertUtils: AssertUtils;

    constructor() {
        this.uiActions = new UIActions();
        this.assertUtils = new AssertUtils();
    }

    async navigateToRegistration(): Promise<void> {
        await this.uiActions.getPageActions().gotoURL(`${ConfigManager.getBaseUIUrl()}/register.htm`);
        await this.uiActions.getPageActions().waitForLoadState('load');
    }

    async fillRegistrationForm(formData: Record<string, string>): Promise<void> {
        for (const [label, value] of Object.entries(formData)) {
            const selector = RegistrationPageLocators.getFieldSelectorByLabel(label);
            const field = this.uiActions.element(selector, label);
            await field.fill(value);
        }
    }

    async submitForm(): Promise<void> {
        const submitButton = this.uiActions.element(
            RegistrationPageLocators.SUBMIT_BUTTON,
            'Register Button'
        );
        await submitButton.click();
    }

    async verifySuccessMessage(expectedMsg: string): Promise<void> {
        const welcomeTitle = await this.uiActions
            .element(RegistrationPageLocators.WELCOME_TITLE, 'Welcome Title')
            .innerText();
        const successText = await this.uiActions
            .element(RegistrationPageLocators.SUCCESS_PARAGRAPH, 'Success Message Paragraph')
            .innerText();

        await this.assertUtils.assertContains(welcomeTitle, 'Welcome', 'Welcome Title');
        await this.assertUtils.assertContains(successText, expectedMsg, 'success message');
    }

    async verifyFieldErrorMessage(expectedMessage: string, fieldKey: string): Promise<void> {
        const errorLocator = RegistrationPageLocators.getErrorLocatorByField(fieldKey);
        const actualErrorText = await this.uiActions
            .element(errorLocator, `Error message for ${fieldKey}`)
            .innerText();

        await this.assertUtils.assertEquals(
            actualErrorText.trim(),
            expectedMessage,
            `Error Message for ${fieldKey}`
        );
    }
}