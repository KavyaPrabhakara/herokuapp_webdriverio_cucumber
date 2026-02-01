const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const DropdownPage = require('../pageobjects/dropdown.page.js');

Given('user is on dropdown page', async () => {
  await DropdownPage.open();
});

When('user selects {string} from dropdown', async (option) => {
  await DropdownPage.selectOption(option);
});

Then('{string} should be selected', async (expectedOption) => {
  const selectedValue = await DropdownPage.getSelectedOption();
  expect(selectedValue).toBe(
    expectedOption === 'Option 1' ? 'Option 1' : 'Option 2'
  );
});
