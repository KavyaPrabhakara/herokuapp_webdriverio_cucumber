const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const DynamicLoadingPage = require('../pageobjects/dynamiccontent.page');
const testData = require('../../testData/testData.json');

Given('user is on dynamic loading page', async () => {
  await DynamicLoadingPage.open();
});

When('user starts loading content', async () => {
  await DynamicLoadingPage.startLoading();
});

Then('loaded content should be visible', async () => {
  await DynamicLoadingPage.waitForContentToLoad();

  const actualText = await DynamicLoadingPage.getLoadedText();
  const expectedText = testData.dynamicLoading.expectedText;

  expect(actualText).toBe(expectedText);
});

