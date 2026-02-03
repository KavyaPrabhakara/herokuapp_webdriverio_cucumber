const { After, Before } = require('@wdio/cucumber-framework');
const allure = require('@wdio/allure-reporter');

Before(async function () {
  // Maximize browser window before each scenario
  await browser.maximizeWindow();
});

After(async function (scenario) {
  const status = scenario.result.status;

  // 🔹 Group scenarios in Allure
  if (status === 'PASSED') {
    allure.addLabel('statusGroup', 'Passed Scenarios');
  } 
  else if (status === 'FAILED') {
    allure.addLabel('statusGroup', 'Failed Scenarios');

    // 🔹 Take screenshot only on failure
    const screenshot = await browser.takeScreenshot();

    allure.addAttachment(
      'Failure Screenshot',
      Buffer.from(screenshot, 'base64'),
      'image/png'
    );
  }
});



