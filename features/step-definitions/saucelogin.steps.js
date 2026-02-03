const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const SauceLoginPage = require('../pageobjects/saucelogin.page.js');
const InventoryPage = require('../pageobjects/inventory.page.js');
const testData = require('../../testData/testData.json');

Given('user is on SauceDemo login page', async () => {
  await SauceLoginPage.open();
});

When('user performs login for all test data', async () => {
  for (const data of testData.loginData) {

    // perform login
    await SauceLoginPage.login(data.username, data.password);

    if (data.result === 'success') {

      // verify successful login
      await expect(InventoryPage.isLoaded()).resolves.toBe(true);

      // logout to reset state
      await InventoryPage.logout();

    } else {

      // verify error message
      const errorText = await SauceLoginPage.getErrorMessage();

      if (!data.errorMessage) {
        throw new Error(
          `Missing message in testData.json for user: ${data.username}`
        );
      }

      expect(errorText).toContain(data.errorMessage);
    }

    // reset app state for next iteration
    await browser.refresh();
    await SauceLoginPage.username.waitForDisplayed({ timeout: 5000 });
  }
});


Then('success and error messages should be validated', async () => {
  // Validation already done in loop
  expect(true).toBe(true);
});

When('user logs in with valid credentials', async () => {
  const validUser = testData.loginData.find(
    data => data.result === 'success'
  );

  await SauceLoginPage.login(validUser.username, validUser.password);
});

When('user logs out', async () => {
  await InventoryPage.logout();
});

Then('user should be redirected to login page', async () => {
  await expect(browser).toHaveUrl('https://www.saucedemo.com/');
});
