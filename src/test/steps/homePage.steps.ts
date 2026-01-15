import { Given, Then } from '@cucumber/cucumber';
import { HomePage } from '../../pages/HomePage';

let homePage: HomePage;

Given('the user navigates to the index page', async () => {
  homePage = new HomePage();
  await homePage.navigateToHome();
});

Then('the user should see the ParaBank logo', async () => {
  await homePage.isLogoVisible();
});

Then('the user should see the login form with fields:', async (dataTable) => {
  const fields = dataTable.raw().flat();
  await homePage.verifyLoginFields(fields);
});