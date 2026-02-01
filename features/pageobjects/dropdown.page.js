const Page = require('./page');

class DropdownPage extends Page {
  get dropdown() { return $('#dropdown'); }

  async open() {
    return super.open('dropdown');
  }

  async selectOption(optionText) {
    await this.dropdown.waitForDisplayed({ timeout: 5000 });
    await this.dropdown.selectByVisibleText(optionText);
  }

  async getSelectedOption() {
    const selected = await this.dropdown.$('option:checked');
    return await selected.getText();
  }
}

module.exports = new DropdownPage();
