const Page = require('./page');

class InventoryPage extends Page {
  get inventoryContainer() { return $('#inventory_container'); }
  get menuBtn() { return $('#react-burger-menu-btn'); }
  get logoutLink() { return $('#logout_sidebar_link'); }

  async isLoaded() {
    await this.waitForDisplayed(this.inventoryContainer);
    return await this.inventoryContainer.isDisplayed();
  }

  async logout() {
    await this.menuBtn.waitForClickable({ timeout: 5000 });
    await this.menuBtn.click();
    await this.logoutLink.waitForClickable({ timeout: 5000 });
    await this.logoutLink.click();
  }
}

module.exports = new InventoryPage();

