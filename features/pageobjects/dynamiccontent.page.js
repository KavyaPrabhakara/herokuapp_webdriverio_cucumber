const Page = require('./page');
const waitUtils = require('../../utils/waitUtils');

class DynamiccontentPage extends Page {
  get startBtn() { return $('#start button'); }
  get loadingText() { return $('#loading'); }
  get loadedText() { return $('#finish h4'); }

  async open() {
    await super.open('/dynamic_loading/1');
  }

  async startLoading() {
    await waitUtils.waitForClickable(this.startBtn);
    await this.startBtn.click();
  }

  async waitForContentToLoad() {
    await waitUtils.waitForNotDisplayed(this.loadingText);
    await waitUtils.waitForDisplayed(this.loadedText);
  }

  async getLoadedText() {
    return await this.loadedText.getText();
  }
}

module.exports = new DynamiccontentPage();
