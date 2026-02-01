const { After, Before } = require('@wdio/cucumber-framework');
const allure = require('@wdio/allure-reporter');

Before(async function () {
  // Maximize browser window before each scenario
  await browser.maximizeWindow();
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await browser.takeScreenshot();

    // Attach screenshot to Allure
    allure.addAttachment(
      'Failure Screenshot',
      Buffer.from(screenshot, 'base64'),
      'image/png'
    );
  }
});
