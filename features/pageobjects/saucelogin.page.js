const Page = require('./page');

class SauceLoginPage extends Page {
  get username() { return $('#user-name'); }
  get password() { return $('#password'); }
  get loginBtn() { return $('#login-button'); }
  get errorMessage() { return $('[data-test="error"]'); }

  async open() {
    await browser.url('https://www.saucedemo.com/');
  }

  async login(user, pass) {
    await this.username.setValue(user);
    await this.password.setValue(pass);
    await this.loginBtn.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.getText();
  }
}

module.exports = new SauceLoginPage();
