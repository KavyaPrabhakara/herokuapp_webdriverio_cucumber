const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const SauceLoginPage = require('../pageobjects/saucelogin.page.js');
const InventoryPage = require('../pageobjects/inventory.page.js');
const { messages } = require('../../utils/testdata.js');

Given('user is on SauceDemo login page', async () => {
  await SauceLoginPage.sauceOpen();
});

When(
  'user logs in with {string} and {string}',
  async (username, password) => {
    await SauceLoginPage.login(username, password);
  }
);

Then('{string} message should be displayed', async (result) => {
  if (result === 'success') {
    const isInventoryLoaded = await InventoryPage.isLoaded();
    expect(isInventoryLoaded).toBe(true);
  } else {
    const errorText = await SauceLoginPage.getErrorMessage();
    expect(errorText).toContain(messages.error);
  }
});

When('user logs out', async () => {
  await InventoryPage.logout();
});

Then('user should be redirected to login page', async () => {
  await SauceLoginPage.username.waitForDisplayed({ timeout: 5000 });
  const url = await browser.getUrl();
  expect(url).toBe('https://www.saucedemo.com/');
});
