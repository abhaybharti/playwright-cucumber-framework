import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { DataProvider } from '../../support/test-data/DataProvider';

let registrationPage: RegistrationPage;

Given('the user is on the registration page', async () => {
    registrationPage = new RegistrationPage();
    await registrationPage.navigateToRegistration();
});

When('the user fills in the form with valid data', async (dataTable: DataTable) => {
    const formData = dataTable.rowsHash();
    formData['Username'] = DataProvider.generateUniqueUsername();
    await registrationPage.fillRegistrationForm(formData);
});

When('the user fills in the form with data:', async (dataTable: DataTable) => {
    const formData = dataTable.rowsHash();
    await registrationPage.fillRegistrationForm(formData);
});

When('the user submits the registration form', async () => {
    await registrationPage.submitForm();
});

Then('the user should see a success message {string}', async (message: string) => {
    await registrationPage.verifySuccessMessage(message);
});

Then(
    'the error message {string} should be visible for {string}',
    async (expectedMessage: string, field: string) => {
        await registrationPage.verifyFieldErrorMessage(expectedMessage, field);
    }
);