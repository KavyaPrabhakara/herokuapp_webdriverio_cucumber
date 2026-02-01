const Page = require('./page');

class SauceLoginPage extends Page {
  get username() { return $('#user-name'); }
  get password() { return $('#password'); }
  get loginBtn() { return $('#login-button'); }
  get errorMessage() { return $('h3[data-test="error"]'); }

  async sauceOpen() {
    await super.sauceOpen();
  }

  async login(user, pass) {
    await this.waitForDisplayed(this.username);
    await this.username.setValue(user);
    await this.password.setValue(pass);
    await this.loginBtn.click();
  }

  async getErrorMessage() {
    await this.waitForDisplayed(this.errorMessage);
    return await this.errorMessage.getText();
  }
}

module.exports = new SauceLoginPage();

