const path = require('path');
const Page = require('./page');

class FileUploadPage extends Page {
  get fileInput() { return $('#file-upload'); }
  get uploadBtn() { return $('#file-submit'); }
  get uploadedFile() { return $('#uploaded-files'); }

  async open() {
    await super.open('/upload');
  }

  async uploadFile(fileName) {
    const filePath = path.join(process.cwd(), 'test-data', fileName);
    const remoteFilePath = await browser.uploadFile(filePath);

    await this.fileInput.waitForExist({ timeout: 5000 });
    await this.fileInput.setValue(remoteFilePath);
    await this.uploadBtn.click();
  }

  async getUploadedFileName() {
    await this.uploadedFile.waitForDisplayed({ timeout: 5000 });
    return await this.uploadedFile.getText();
  }
}

module.exports = new FileUploadPage();
