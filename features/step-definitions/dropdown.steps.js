const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, browser } = require('@wdio/globals');
const DropdownPage = require('../pageobjects/dropdown.page.js');
const testData = require('../../testData/testData.json');

Given('user is on dropdown page', async () => {
  await DropdownPage.open();
});

When('user selects value from dropdown using test data', async () => {
  for (const data of testData.dropdownData) {
    await DropdownPage.selectOption(data.option);
  }
});

Then('selected value should match test data', async () => {
  const selectedValue = await DropdownPage.getSelectedOption();
  const expectedValue = testData.dropdownData[0].option;
  expect(selectedValue).toBe(expectedValue);
});

