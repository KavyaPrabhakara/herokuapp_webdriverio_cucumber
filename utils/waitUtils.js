class WaitUtils {
  /**
   * Wait for element to be clickable
   */
  static async waitForClickable(element) {
    await element.waitForClickable({ timeout:5000 });
  }

  static async waitForDisplayed(element) {
    await element.waitForDisplayed({ timeout:5000 });
  }

  static async waitForNotDisplayed(element) {
    await element.waitForDisplayed({ reverse: true, timeout:10000 });
  }

  static async waitForExist(element) {
    await element.waitForExist({ timeout:5000 });
  }

}

module.exports = WaitUtils;
