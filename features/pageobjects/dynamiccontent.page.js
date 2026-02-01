const Page = require('./page');

class DynamiccontentPage extends Page {
  get startBtn() { return $('#start button'); }
  get loadingText() { return $('#loading'); }
  get loadedText() { return $('#finish h4'); }

  async open() {
    await super.open('/dynamic_loading/1');
  }

  async startLoading() {
    await this.startBtn.waitForClickable({ timeout: 5000 });
    await this.startBtn.click();
  }

  async waitForContentToLoad() {
    await this.loadingText.waitForDisplayed({ reverse: true, timeout: 10000 });
    await this.loadedText.waitForDisplayed({ timeout: 5000 });
  }

  async getLoadedText() {
    return await this.loadedText.getText();
  }
}

module.exports = new DynamiccontentPage();
