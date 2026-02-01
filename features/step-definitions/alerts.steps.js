const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');

const AlertsPage = require('../pageobjects/alerts.page');

Given('user is on alerts page', async () => {
  await AlertsPage.open();
});

When('user clicks button to trigger alert', async () => {
  await AlertsPage.clickAlertButton();
});

When('user clicks button to trigger confirm', async () => {
  await AlertsPage.clickConfirmButton();
});

When('user clicks button to trigger prompt', async () => {
  await AlertsPage.clickPromptButton();
});

When('user accepts alert', async () => {
  await AlertsPage.acceptAlert();
});

When('user accepts confirm', async () => {
  await AlertsPage.acceptAlert();
});

When('user accepts prompt', async () => {
  await AlertsPage.acceptPrompt();
});

When('user dismisses confirm', async () => {
  await AlertsPage.dismissAlert();
});

When('user enters {string} in prompt', async (text) => {
  await AlertsPage.sendTextToPrompt(text);
});

Then('alert message should say {string}', async (expectedText) => {
  const alertText = await AlertsPage.getAlertText();
  expect(alertText).toBe(expectedText);
});

Then('result message should say {string}', async (expectedMessage) => {
  const result = await AlertsPage.getResultMessage();
  expect(result).toBe(expectedMessage);
});