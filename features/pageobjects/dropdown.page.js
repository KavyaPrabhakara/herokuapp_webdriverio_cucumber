const Page = require('./page');
const waitUtils = require('../../utils/waitUtils');

class DropdownPage extends Page {
  get dropdown() { return $('#dropdown'); }

  async open() {
    return super.open('dropdown');
  }

  async selectOption(optionText) {
    await waitUtils.waitForDisplayed(this.dropdown);
    await this.dropdown.selectByVisibleText(optionText);
  }

  async getSelectedOption() {
    const selected = await this.dropdown.$('option:checked');
    return await selected.getText();
  }
}

module.exports = new DropdownPage();
