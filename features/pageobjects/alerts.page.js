const Page = require('./page');

class AlertsPage extends Page {

  get jsAlertBtn() { return $('button=Click for JS Alert'); }
  get jsConfirmBtn() { return $('button=Click for JS Confirm'); }
  get jsPromptBtn() { return $('button=Click for JS Prompt'); }
  get resultText() { return $('#result'); }

  async open() {
    await super.open('/javascript_alerts');
  }

  // Store alert text to use later
  _alertText = null;

  async waitForAlert() {
    // Add small delay to allow alert to render
    await browser.pause(100);
    
    await browser.waitUntil(
        async () => await browser.isAlertOpen(),
        {
            timeout: 5000,
            interval: 200,
            timeoutMsg: 'Expected alert to appear, but it did not'
        }
    );
  }

  // CLICK BUTTONS
  async clickAlertButton() {
    await this.jsAlertBtn.waitForClickable({ timeout: 5000 });
    await this.jsAlertBtn.click();
    await this.waitForAlert();
    // Capture alert text before doing anything else
    try {
      this._alertText = await browser.getAlertText();
    } catch (error) {
      console.error('Error capturing alert text:', error.message);
    }
  }

  async clickConfirmButton() {
    await this.jsConfirmBtn.waitForClickable({ timeout: 5000 });
    await this.jsConfirmBtn.click();
    await this.waitForAlert();
    // Capture alert text for confirm as well
    try {
      this._alertText = await browser.getAlertText();
    } catch (error) {
      console.error('Error capturing confirm text:', error.message);
    }
  }

  async clickPromptButton() {
    await this.jsPromptBtn.waitForClickable({ timeout: 5000 });
    await this.jsPromptBtn.click();
    await this.waitForAlert();
    // Capture alert text for prompt as well
    try {
      this._alertText = await browser.getAlertText();
    } catch (error) {
      console.error('Error capturing prompt text:', error.message);
    }
  }

  // ALERT ACTIONS
  async getAlertText() {
    // Return previously captured text if available
    if (this._alertText) {
      const text = this._alertText;
      this._alertText = null; // Reset after returning
      return text;
    }
    // Fallback: try to get it directly
    try {
      if (await browser.isAlertOpen()) {
        return await browser.getAlertText();
      }
    } catch (error) {
      console.error('Error getting alert text:', error.message);
    }
    throw new Error('Alert is not open or text was not captured');
  }

  async acceptAlert() {
    try {
      await this.waitForAlert();
      await browser.acceptAlert();
    } catch (error) {
      console.error('Error accepting alert:', error.message);
    }
    this._alertText = null; // Reset after accepting
  }

  async dismissAlert() {
    try {
      await this.waitForAlert();
      await browser.dismissAlert();
    } catch (error) {
      console.error('Error dismissing alert:', error.message);
    }
    this._alertText = null; // Reset after dismissing
  }

  async sendTextToPrompt(text) {
    await this.waitForAlert();
    await browser.sendAlertText(text);
  }

  async acceptPrompt() {
    try {
      await this.waitForAlert();
      await browser.acceptAlert();
    } catch (error) {
      console.error('Error accepting prompt:', error.message);
    }
  }

  // RESULT
  async getResultMessage() {
    await this.resultText.waitForDisplayed({ timeout: 5000 });
    return await this.resultText.getText();
  }
}

module.exports = new AlertsPage();
