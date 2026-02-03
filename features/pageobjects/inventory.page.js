  const Page = require('./page');
  const waitUtils = require('../../utils/waitUtils');

class InventoryPage extends Page {
  get title() { return $('.title'); }
  get menuBtn() { return $('#react-burger-menu-btn'); }
  get logoutBtn() { return $('#logout_sidebar_link'); }

  async isLoaded() {
    return await this.title.isDisplayed();
  }

  async logout() {
    await this.menuBtn.click();
    await waitUtils.waitForDisplayed(this.logoutBtn);
    await this.logoutBtn.click();
  }
}

module.exports = new InventoryPage();
