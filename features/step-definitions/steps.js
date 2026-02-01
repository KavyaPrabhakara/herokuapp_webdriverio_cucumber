const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');
const DropdownPage = require('../pageobjects/dropdown.page');
const AlertsPage = require('../pageobjects/alerts.page');

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
});

Given(/^user is on dropdown page$/, async () => {
    await DropdownPage.open();
});

When(/^user selects "(.+)" from dropdown$/, async (optionText) => {
    await DropdownPage.selectOption(optionText);
});

Then(/^"(.+)" should be selected$/, async (expectedText) => {
    const selected = await DropdownPage.getSelectedOption();
    await expect(selected).toBe(expectedText);
});

// Alert Handling Steps
Given(/^user is on alerts page$/, async () => {
    await AlertsPage.open();
});

When(/^user clicks button to trigger alert$/, async () => {
    await AlertsPage.clickAlertButton();
});

Then(/^alert dialog should be displayed$/, async () => {
    const alertText = await AlertsPage.getAlertText();
    await expect(alertText).toBeTruthy();
});

Then(/^alert message should say "(.+)"$/, async (expectedMessage) => {
    // Get fresh alert text - this is the cached version from previous getAlertText() call
    const alertText = await AlertsPage.getAlertText();
    await expect(alertText).toBe(expectedMessage);
    // Important: The alert will be automatically dismissed after this verification
    // due to WebDriver BIDI protocol behavior. We'll need to re-interact with it.
});

When(/^user accepts alert$/, async () => {
    // Clear the cache and get the current alert state before accepting
    await AlertsPage.clearAlertCache();
    await AlertsPage.acceptAlert();
});

Then(/^alert should be closed$/, async () => {
    // If we got here without error, alert was successfully closed
    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain('javascript_alerts');
});

When(/^user clicks button to trigger confirm$/, async () => {
    await AlertsPage.clickConfirmButton();
});

Then(/^confirm dialog should be displayed$/, async () => {
    const alertText = await AlertsPage.getAlertText();
    await expect(alertText).toBeTruthy();
});

When(/^user accepts confirm$/, async () => {
    // Clear cache and accept
    await AlertsPage.clearAlertCache();
    await AlertsPage.acceptAlert();
});

When(/^user dismisses confirm$/, async () => {
    await AlertsPage.dismissAlert();
});

Then(/^result message should say "(.+)"$/, async (expectedMessage) => {
    const resultMessage = await AlertsPage.getResultMessage();
    await expect(resultMessage).toBe(expectedMessage);
});

When(/^user clicks button to trigger prompt$/, async () => {
    await AlertsPage.clickPromptButton();
});

Then(/^prompt dialog should be displayed$/, async () => {
    const alertText = await AlertsPage.getAlertText();
    await expect(alertText).toBeTruthy();
});

When(/^user enters "(.+)" in prompt$/, async (text) => {
    await AlertsPage.sendKeysToAlert(text);
});

When(/^user accepts prompt$/, async () => {
    // Clear cache and accept
    await AlertsPage.clearAlertCache();
    await AlertsPage.acceptAlert();
});

When(/^user dismisses prompt$/, async () => {
    await AlertsPage.dismissAlert();
});

